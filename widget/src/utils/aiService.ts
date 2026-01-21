import { ApiClient } from './apiClient';
import { ConversationStateManager } from './conversationState';
import { PageContextExtractor, PageContext } from './pageContext';
import { ChatRequest, ChatResponse, ConversationMessage, ConversationState } from '../types';
import { WidgetConfig } from './config';

export class AIService {
  private apiClient: ApiClient;
  private stateManager: ConversationStateManager;
  private pageContext: PageContext;
  private contextUnwatch?: () => void;

  constructor(apiClient: ApiClient, config: WidgetConfig) {
    this.apiClient = apiClient;
    this.stateManager = new ConversationStateManager();
    
    // Extract initial page context
    this.pageContext = PageContextExtractor.extractContext();
    
    // Watch for context changes
    this.contextUnwatch = PageContextExtractor.watchForChanges((newContext) => {
      this.pageContext = newContext;
      this.stateManager.updateContext({
        pageType: newContext.pageType,
        productId: newContext.productId,
        category: newContext.category,
        currentPage: newContext.currentUrl,
      });
    });

    // Initialize with greeting if no messages exist
    if (this.stateManager.getMessages().length === 0) {
      this.addGreeting();
    }
  }

  private addGreeting(): void {
    const greeting: ConversationMessage = {
      id: `msg-greeting-${Date.now()}`,
      role: 'assistant',
      type: 'text',
      content: this.getInitialGreeting(),
      timestamp: Date.now(),
    };
    this.stateManager.addMessage(greeting);
  }

  private getInitialGreeting(): string {
    const context = this.pageContext;
    
    if (context.pageType === 'product' && context.productName) {
      return `Hi! I'm ModlyAI, your furniture configuration assistant. I see you're looking at ${context.productName}. I can help you decide if this is the right fit, suggest similar items from our catalog, or help you configure it using our factory-approved options. What would you like to know?`;
    } else if (context.pageType === 'category' && context.category) {
      return `Hello! I'm ModlyAI, your furniture sales and configuration assistant. I see you're browsing ${context.category}. I can help you compare products, understand their features, and configure them to match your needs. What are you looking for today?`;
    } else {
      return `Hello! I'm ModlyAI, your furniture sales and configuration assistant. I can help you choose the right products from our catalog, plan your room, or configure items using our factory-approved options. What would you like to start with?`;
    }
  }

  async sendMessage(userMessage: string): Promise<ChatResponse> {
    // Add user message to state
    const userMsg: ConversationMessage = {
      id: `msg-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      type: 'text',
      content: userMessage,
      timestamp: Date.now(),
    };
    this.stateManager.addMessage(userMsg);

    // Build request
    const state = this.stateManager.getState();
    const request: ChatRequest = {
      message: userMessage,
      conversationHistory: state.messages,
      context: {
        pageType: this.pageContext.pageType,
        productId: this.pageContext.productId,
        category: this.pageContext.category,
        currentPage: this.pageContext.currentUrl,
      },
      userPreferences: state.userPreferences,
    };

    // Call API
    try {
      const chatResponse = await this.apiClient.chat(request);
      
      // Add assistant response to state
      this.stateManager.addMessage(chatResponse.message);

      // Update preferences if provided
      if (chatResponse.updatedPreferences) {
        this.stateManager.updatePreferences(chatResponse.updatedPreferences);
      }

      // Update intent if we can infer it from the conversation
      this.updateIntentFromMessage(chatResponse.message);

      return chatResponse;
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Create a more helpful error message
      let errorMessage = 'I apologize, but I encountered an error. Please try again.';
      if (error instanceof Error) {
        const errorMsg = error.message;
        if (errorMsg.includes('quota exceeded') || errorMsg.includes('insufficient_quota')) {
          errorMessage = 'I apologize, but the AI service has reached its usage limit. The OpenAI API quota has been exceeded. Please contact the administrator to check the billing and usage limits, or try again later.';
        } else if (errorMsg.includes('AI service not configured') || errorMsg.includes('OPENAI_API_KEY')) {
          errorMessage = 'The AI service is not configured. The OpenAI API key needs to be set in the server environment variables. Please contact the administrator.';
        } else if (errorMsg.includes('rate limit')) {
          errorMessage = 'The AI service is currently experiencing high demand. Please try again in a few moments.';
        } else if (errorMsg.includes('Network error') || errorMsg.includes('fetch')) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
        } else if (errorMsg.includes('Failed to get chat response')) {
          errorMessage = 'The server encountered an error processing your request. Please try again in a moment.';
        } else if (errorMsg.includes('OpenAI API error')) {
          errorMessage = errorMsg; // Show the OpenAI error directly
        } else {
          // Include the actual error message
          errorMessage = errorMsg;
        }
      }
      
      // Add error message
      const errorMsg: ConversationMessage = {
        id: `msg-error-${Date.now()}`,
        role: 'assistant',
        type: 'text',
        content: errorMessage,
        timestamp: Date.now(),
      };
      this.stateManager.addMessage(errorMsg);
      
      throw error;
    }
  }

  private updateIntentFromMessage(message: ConversationMessage): void {
    const content = message.content.toLowerCase();
    const metadata = message.metadata;

    if (metadata?.action) {
      switch (metadata?.action?.type) {
        case 'open_room_planner':
          this.stateManager.updateIntent('room_planning');
          break;
        case 'open_customizer':
          this.stateManager.updateIntent('customization');
          break;
        default:
          if (content.includes('browse') || content.includes('catalog')) {
            this.stateManager.updateIntent('browsing');
          }
      }
    } else if (content.includes('room') || content.includes('plan')) {
      this.stateManager.updateIntent('room_planning');
    } else if (content.includes('customize') || content.includes('customization')) {
      this.stateManager.updateIntent('customization');
    } else if (content.includes('browse') || content.includes('show') || content.includes('catalog')) {
      this.stateManager.updateIntent('browsing');
    }
  }

  getState(): ConversationState {
    return this.stateManager.getState();
  }

  getMessages(): ConversationMessage[] {
    return this.stateManager.getMessages();
  }

  clearConversation(): void {
    this.stateManager.resetConversation();
    this.addGreeting();
  }

  updatePreferences(preferences: Partial<ConversationState['userPreferences']>): void {
    this.stateManager.updatePreferences(preferences);
  }

  destroy(): void {
    if (this.contextUnwatch) {
      this.contextUnwatch();
    }
  }
}
