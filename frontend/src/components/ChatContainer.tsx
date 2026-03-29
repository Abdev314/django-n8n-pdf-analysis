import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    content: 'Welcome! Ask me anything about PDF analysis or the workflow and I’ll help you get started.',
    isUser: false,
  },
];

export const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      content: message,
      isUser: true,
    };

    setMessages((current) => [...current, userMessage]);
    setIsSending(true);

    window.setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `${Date.now()}-bot`,
        content: 'Thanks for your message! I’m here to help with PDF analysis and workflow questions.',
        isUser: false,
      };

      setMessages((current) => [...current, botMessage]);
      setIsSending(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-white shrink-0">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
          <p className="text-xs text-gray-500">Always here to help</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50/50">
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              isUser={message.isUser}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
      {isSending && (
        <div className="px-6 py-3 text-xs text-gray-500 bg-gray-50 border-t border-gray-100">
          Typing a response...
        </div>
      )}
    </div>
  );
};
