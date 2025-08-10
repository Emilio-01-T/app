import { useState, useEffect } from 'react';
import { WebSocketService } from '../services/websocketService';

export function useWebSocket() {
  const [socket, setSocket] = useState(null);

  const connect = (token) => {
    const ws = new WebSocketService(token);
    ws.connect();
    setSocket(ws);
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return { socket, connect, disconnect };
}
