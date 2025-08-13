/**
 * @file components/Layout/ChatContainer.tsx
 * @description Container principale per l'area della chat
 * @purpose Gestire la visualizzazione dei messaggi e l'input
 * @dependencies React, hooks/useChatHistory.ts, hooks/useChatMessages.ts, types/index.ts, components/Chat/ChatMessage.tsx, components/Chat/ChatInput.tsx, components/Chat/TypingIndicator.tsx, components/UI/ConnectionStatus.tsx, styles/layout.css, styles/components.css
 * @used_in MainLayout.tsx
 * @pattern Container Component Pattern
 */

import React, { useEffect, useState, useRef } from 'react';
import { useChatHistory } from '../../hooks/useChatHistory';
import { useChatMessages } from '../../hooks/useChatMessages';
import type { ConnectionStatus, Message } from '../../types';
import ChatMessage from '../Chat/ChatMessage';
import ChatInput from '../Chat/ChatInput';
import TypingIndicator from '../Chat/TypingIndicator';
import ConnectionStatusComponent from '../UI/ConnectionStatus';
import '../../styles/layout.css';
import '../../styles/components.css';
import '../../styles/animations.css';

/**
 * Interfaccia props per il componente ChatContainer
 */
interface ChatContainerProps {
  status: ConnectionStatus;        // Stato connessione
  onSendMessage: (message: string) => void;  // Callback per invio messaggi
  socket: WebSocket | null;       // Istanza WebSocket
  onToggleSidebar: () => void;    // Callback per toggle sidebar
}

/**
 * Container principale per l'area della chat
 * Gestisce la visualizzazione dei messaggi e l'input utente
 * @param {ChatContainerProps} props - Props del componente
 */
const ChatContainer: React.FC<ChatContainerProps> = ({
  status,
  onSendMessage,
  socket,
  onToggleSidebar,
 
}) => {
  // Hook per gestire la cronologia delle chat
  const { getCurrentSession } = useChatHistory();
  // Hook per gestire i messaggi della chat
  const { messages, isTyping } = useChatMessages(socket);
  // Stato per i messaggi visualizzati
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  // Ref per lo scroll automatico
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Stato per gestire la rotazione dell'icona della sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   /**
   * Funzione per gestire il toggle della sidebar
   */
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onToggleSidebar();
  };

  /**
   * Funzione per scroll automatico all'ultimo messaggio
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effetto per aggiornare i messaggi quando cambia la sessione corrente
  useEffect(() => {
    const currentSession = getCurrentSession();
    if (currentSession) {
      setDisplayMessages(currentSession.messages);
    } else {
      setDisplayMessages([]);
    }
  }, [getCurrentSession]);

  // Effetto per aggiornare i messaggi quando arrivano nuovi messaggi
  useEffect(() => {
    if (messages.length > 0) {
      setDisplayMessages(messages);
    }
  }, [messages]);

  // Effetto per scroll automatico quando cambiano i messaggi
  useEffect(() => {
    scrollToBottom();
  }, [displayMessages, isTyping]);

  // Recupera la sessione corrente
  const currentSession = getCurrentSession();

  return (
    <div className="main-chat">
      {/* Header con titolo e stato connessione */}
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* <button
            onClick={onToggleSidebar}
            className="button button-secondary"
            style={{ padding: '0.5rem' }}
            title="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button> */}
          <div className="sidebar-controls">
            <button
              onClick={handleToggleSidebar}
              className="sidebar-control-btn"
              title={isSidebarOpen ? "Nascondi sidebar" : "Mostra sidebar"}>
              <svg 
                className={`icon sidebar-toggle-icon ${!isSidebarOpen ? '' : 'rotated'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ transition: 'transform 0.3s ease'}} >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <h1 className="chat-title">
            {currentSession?.title || 'Nuova Chat'}
          </h1>
        </div>
        <ConnectionStatusComponent status={status} />
      </div>

      {/* Container messaggi */}
      <div className="chat-container">
        {displayMessages.length === 0 ? (
          // Stato vuoto quando non ci sono messaggi
          <div className="empty-state">
            <h2>Inizia una nuova conversazione</h2>
            <p>Invia un messaggio per iniziare a chattare con il team AI</p>
          </div>
        ) : (
          // Lista dei messaggi
          <>
            {displayMessages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            {/* Elemento invisibile per lo scroll automatico */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Container input */}
      <div className="chat-input-container">
        <ChatInput 
          onSend={onSendMessage} 
          disabled={!status.connected} 
        />
      </div>
    </div>
  );
};

export default ChatContainer;