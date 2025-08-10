export class WebSocketService {
  constructor(token) {
    this.token = token;
    this.socket = null;
    this.listeners = {};
  }

  connect() {
    this.socket = new WebSocket(`ws://localhost:8000/ws/agent-team?token=${this.token}`);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    }
  }

  addEventListener(event, callback) {
    this.socket.addEventListener(event, callback);
  }

  removeEventListener(event, callback) {
    this.socket.removeEventListener(event, callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
