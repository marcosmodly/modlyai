import { ApiClient } from './apiClient';
import { ChatResponse, ConversationMessage, ConversationState } from '../types';
import { WidgetConfig } from './config';
export declare class AIService {
    private apiClient;
    private stateManager;
    private pageContext;
    private contextUnwatch?;
    private readonly fallbackMessage;
    private readonly config;
    constructor(apiClient: ApiClient, config: WidgetConfig);
    private ensureInitialWelcomeMessage;
    private addGreeting;
    sendMessage(userMessage: string): Promise<ChatResponse>;
    private updateIntentFromMessage;
    getState(): ConversationState;
    getMessages(): ConversationMessage[];
    clearConversation(): void;
    updatePreferences(preferences: Partial<ConversationState['userPreferences']>): void;
    destroy(): void;
}
//# sourceMappingURL=aiService.d.ts.map