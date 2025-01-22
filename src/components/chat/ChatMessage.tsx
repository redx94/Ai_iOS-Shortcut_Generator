import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Message } from '../../types';
import { clsx } from 'clsx';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={clsx(
        'flex',
        message.isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={clsx(
          'max-w-[80%] rounded-lg p-4',
          message.isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-900'
        )}
      >
        <div className="flex items-start space-x-2">
          {!message.isUser && (
            <ChatBubbleLeftIcon className="w-5 h-5 mt-1" />
          )}
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}