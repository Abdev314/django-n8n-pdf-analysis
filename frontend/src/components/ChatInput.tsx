import { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t border-gray-100 bg-white">
      <button
        className="
          p-2.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100
          transition-all duration-200 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
        "
        title="Attach file"
      >
        <Paperclip className="w-5 h-5" />
      </button>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="
          flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full
          text-sm text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30
          transition-all duration-200
        "
      />

      <button
        onClick={handleSend}
        disabled={!inputValue.trim()}
        className={`
          p-2.5 rounded-full
          transition-all duration-200 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          ${
            inputValue.trim()
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        `}
        title="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};
