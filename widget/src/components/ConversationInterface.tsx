import React, { useState, useEffect, useRef } from 'react';
import { AIService } from '../utils/aiService';
import { ConversationMessage, FurnitureItem } from '../types';
import { MessageBubble } from './MessageBubble';

interface ConversationInterfaceProps {
  aiService: AIService;
  onCustomizeItem?: (item: FurnitureItem) => void;
  onAddToRoomPlanner?: (item: FurnitureItem) => void;
  onOpenRoomPlanner?: () => void;
  onOpenCustomizer?: () => void;
  onShowCatalog?: () => void;
  onViewInCatalog?: (item: FurnitureItem) => void;
}

export function ConversationInterface({
  aiService,
  onCustomizeItem,
  onAddToRoomPlanner,
  onOpenRoomPlanner,
  onOpenCustomizer,
  onShowCatalog,
  onViewInCatalog,
}: ConversationInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load messages from AI service
  useEffect(() => {
    setMessages(aiService.getMessages());
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message immediately
    const userMsg: ConversationMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      type: 'text',
      content: userMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Add thinking indicator
    const thinkingMsg: ConversationMessage = {
      id: `msg-thinking-${Date.now()}`,
      role: 'assistant',
      type: 'thinking',
      content: 'Thinking...',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const response = await aiService.sendMessage(userMessage);
      
      // Remove thinking message and add actual response
      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => m.type !== 'thinking');
        return [...withoutThinking, response.message];
      });

      // Handle actions
      if (response.message.metadata?.action) {
        const actionType = response.message.metadata?.action?.type;
        setTimeout(() => {
          switch (actionType) {
            case 'open_room_planner':
              onOpenRoomPlanner?.();
              break;
            case 'open_customizer':
              onOpenCustomizer?.();
              break;
            case 'show_catalog':
              onShowCatalog?.();
              break;
            case 'customize_item':
              if (response.message.metadata?.action?.data) {
                onCustomizeItem?.(response.message.metadata?.action?.data);
              }
              break;
          }
        }, 500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove thinking message on error
      setMessages((prev) => prev.filter((m) => m.type !== 'thinking'));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Start a conversation to get help with your furniture needs.</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onCustomizeItem={onCustomizeItem}
              onAddToRoomPlanner={onAddToRoomPlanner}
              onViewInCatalog={onViewInCatalog}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Send'
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
