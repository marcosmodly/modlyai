import { ConversationState, ConversationMessage } from '../types';

const STORAGE_KEY = 'modly-conversation-state';

export class ConversationStateManager {
  private state: ConversationState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): ConversationState {
    try {
      if (typeof window !== 'undefined') {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('Failed to load conversation state:', e);
    }
    return {
      messages: [],
      userPreferences: {},
      context: {},
    };
  }

  private saveState(): void {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn('Failed to save conversation state:', e);
    }
  }

  getState(): ConversationState {
    return { ...this.state };
  }

  addMessage(message: ConversationMessage): void {
    this.state.messages.push(message);
    this.saveState();
  }

  getMessages(): ConversationMessage[] {
    return [...this.state.messages];
  }

  updateIntent(intent: ConversationState['currentIntent']): void {
    this.state.currentIntent = intent;
    this.saveState();
  }

  updatePreferences(preferences: Partial<ConversationState['userPreferences']>): void {
    this.state.userPreferences = {
      ...this.state.userPreferences,
      ...preferences,
    };
    this.saveState();
  }

  updateContext(context: Partial<ConversationState['context']>): void {
    this.state.context = {
      ...this.state.context,
      ...context,
    };
    this.saveState();
  }

  clearState(): void {
    this.state = {
      messages: [],
      userPreferences: {},
      context: {},
    };
    this.saveState();
  }

  resetConversation(): void {
    this.state.messages = [];
    this.state.currentIntent = undefined;
    this.saveState();
  }
}
