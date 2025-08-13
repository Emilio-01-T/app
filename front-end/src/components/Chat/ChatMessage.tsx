/**
 * @file components/Chat/ChatMessage.tsx
 * @description Componente per visualizzare un singolo messaggio nella chat
 * @purpose Mostrare messaggi utente e agenti con formattazione diversa
 * @dependencies React, types/index.ts, components/UI/Avatar.tsx, styles/components.css
 * @used_in ChatContainer.tsx
 * @pattern Message Component Pattern
 */

import React from 'react';
import { Message } from '../../types';
import Avatar from '../UI/Avatar';
import '../../styles/components.css';

/**
 * Interfaccia props per il componente ChatMessage
 */
interface ChatMessageProps {
  message: Message;  // Messaggio da visualizzare
}

/**
 * Componente per visualizzare un singolo messaggio della chat
 * @param {ChatMessageProps} props - Props del componente
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  /**
   * Estrae le iniziali dal nome dell'agente
   * @param {string} name - Nome dell'agente
   * @returns {string} Iniziali in maiuscolo
   */
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  /**
   * Formatta il timestamp in formato leggibile
   * @param {string} dateString - Data in formato ISO
   * @returns {string} Ora formattata
   */
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${message.isUser ? 'user' : 'agent'}`}>
      {/* Avatar dell'autore del messaggio */}
      <div className="message-avatar">
        <Avatar>
          {message.isUser ? 'U' : getInitials(message.agent)}
        </Avatar>
      </div>
      
      {/* Contenuto del messaggio */}
      <div className="message-content">
        {/* Header con autore e timestamp */}
        <div className="message-header">
          <span className="message-agent">
            {message.isUser ? 'Tu' : message.agent}
          </span>
          <span className="message-time">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        {/* Corpo del messaggio */}
        <div className="message-body">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;