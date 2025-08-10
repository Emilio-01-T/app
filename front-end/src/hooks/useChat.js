import { useState, useEffect } from 'react';

export function useChat(socket) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, {
        agent: data.agent,
        content: data.content,
        timestamp: new Date().toISOString(),
      }]);
    };

    socket.addEventListener('message', handleMessage);
    return () => socket.removeEventListener('message', handleMessage);
  }, [socket]);

  const sendMessage = (task) => {
    if (socket) {
      socket.send(JSON.stringify({
        task,
        timestamp: new Date().toISOString(),
      }));
      
      // Add user message to UI
      setMessages(prev => [...prev, {
        agent: 'user',
        content: task,
        timestamp: new Date().toISOString(),
      }]);
    }
  };

  return { messages, sendMessage };
}
