import React from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          agent={msg.agent}
          content={msg.content}
          timestamp={msg.timestamp}
          isUser={msg.agent === 'user'}
        />
      ))}
    </div>
  );
}
