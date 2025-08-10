import { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Invia un task al team..."
        className="flex-1"
      />
      <Button type="submit" disabled={!message.trim()}>
        Invia
      </Button>
    </form>
  );
}
