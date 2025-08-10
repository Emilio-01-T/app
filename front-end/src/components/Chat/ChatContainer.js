import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useChat } from '../../hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Header from '../Layout/Header';

export default function ChatContainer() {
  const { user, logout } = useAuth();
  const { socket, connect, disconnect } = useWebSocket();
  const { messages, sendMessage } = useChat(socket);

  useEffect(() => {
    connect(user.token);
    return () => disconnect();
  }, [user]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header user={user} onLogout={logout} />
      
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>
      
      <div className="p-4 bg-white border-t">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
