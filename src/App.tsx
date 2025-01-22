import React, { useState } from 'react';
import { ChatBubbleLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI Shortcut Generator. Describe what you'd like to automate and I'll help create a shortcut for you.",
      isUser: false
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand you want to create a shortcut. Let me help you with that. Could you provide more details about what you'd like to automate?",
        isUser: false
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Shortcut Generator</h1>
          <p className="mt-2 text-gray-600">Create iOS shortcuts using natural language</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <ChatBubbleLeftIcon className="w-5 h-5 mt-1" />
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the shortcut you want to create..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;