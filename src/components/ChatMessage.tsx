import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-4 ${role === 'assistant' ? 'bg-blue-50' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        role === 'assistant' ? 'bg-blue-600' : 'bg-green-600'
      }`}>
        {role === 'assistant' ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 pt-1">
        <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
