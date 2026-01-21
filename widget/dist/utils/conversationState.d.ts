import { ConversationState, ConversationMessage } from '../types';
export declare class ConversationStateManager {
    private state;
    constructor();
    private loadState;
    private saveState;
    getState(): ConversationState;
    addMessage(message: ConversationMessage): void;
    getMessages(): ConversationMessage[];
    updateIntent(intent: ConversationState['currentIntent']): void;
    updatePreferences(preferences: Partial<ConversationState['userPreferences']>): void;
    updateContext(context: Partial<ConversationState['context']>): void;
    clearState(): void;
    resetConversation(): void;
}
//# sourceMappingURL=conversationState.d.ts.map