import { ApiClient } from './apiClient';
import { ConversationStateManager } from './conversationState';
import { PageContextExtractor, PageContext } from './pageContext';
import { ChatRequest, ChatResponse, ConversationMessage, ConversationState } from '../types';
import { DEFAULT_WELCOME_MESSAGE, getWelcomeMessage, WidgetConfig } from './config';

export class AIService {
  private apiClient: ApiClient;
  private stateManager: ConversationStateManager;
  private pageContext: PageContext;
  private contextUnwatch?: () => void;
  private readonly fallbackMessage = "Sorry, I couldn't reach ModlyAI right now. Please try again.";
  private readonly config: WidgetConfig;

  constructor(apiClient: ApiClient, config: WidgetConfig) {
    this.apiClient = apiClient;
    this.config = config;
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

    this.ensureInitialWelcomeMessage();
  }

  private ensureInitialWelcomeMessage(): void {
    const welcomeText = getWelcomeMessage(this.config);
    const messages = this.stateManager.getMessages();

    if (messages.length === 0) {
      this.addGreeting(welcomeText);
      return;
    }

    const [first, ...rest] = messages;
    const shouldUpdateWelcome =
      first.role === 'assistant' &&
      (
        first.isWelcome ||
        first.id.startsWith('msg-greeting-') ||
        first.content === DEFAULT_WELCOME_MESSAGE
      );

    if (shouldUpdateWelcome && first.content !== welcomeText) {
      const updatedMessages = [
        {
          ...first,
          content: welcomeText,
          isWelcome: true,
        },
        ...rest,
      ];
      this.stateManager.updateMessages(updatedMessages);

      return;
    }
  }

  private addGreeting(welcomeText = getWelcomeMessage(this.config)): void {
    const greeting: ConversationMessage = {
      id: `msg-greeting-${Date.now()}`,
      role: 'assistant',
      type: 'text',
      content: welcomeText,
      timestamp: Date.now(),
      isWelcome: true,
    };
    this.stateManager.addMessage(greeting);

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
      
      // Add a user-safe error message while keeping the real error in the console.
      const errorMsg: ConversationMessage = {
        id: `msg-error-${Date.now()}`,
        role: 'assistant',
        type: 'text',
        content: this.fallbackMessage,
        timestamp: Date.now(),
      };
      this.stateManager.addMessage(errorMsg);

      return { message: errorMsg };
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
