/**
 * @file hooks/useChatMessages.ts
 * @description Hook per gestire i messaggi della chat in tempo reale
 * @purpose Gestire l'invio e la ricezione di messaggi tramite WebSocket
 * @dependencies React, types/index.ts
 * @used_in ChatContainer.tsx
 * @pattern Real-time Data Pattern
 */

import { useState, useEffect } from 'react';
import { Message } from '../types';

/**
 * Hook per gestire i messaggi della chat
 * @param {WebSocket | null} socket - Istanza WebSocket attiva
 * @returns {Object} Oggetto con messaggi, stato e funzioni di invio
 */
export const useChatMessages = (socket: WebSocket | null) => {
  // Stato per i messaggi della chat
  const [messages, setMessages] = useState<Message[]>([]);
  // Stato per indicatore di digitazione
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Se non c'è un socket, non fare nulla
    if (!socket) return;

    /**
     * Handler per messaggi in arrivo dal WebSocket
     * @param {MessageEvent} event - Evento messaggio WebSocket
     */
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        // Gestisci solo messaggi tipo 'agent_message'
        if (data.type === 'agent_message') {
          // Aggiungi il nuovo messaggio allo stato
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            agent: data.agent || 'AI Assistant',
            content: data.content,
            timestamp: data.timestamp || new Date().toISOString()
          }]);
          
          // Ferma l'indicatore di digitazione
          setIsTyping(false);
        }
      } catch (error) {
        console.error('Errore nel parsing del messaggio WebSocket:', error);
      }
    };

    // Registra l'event listener
    socket.addEventListener('message', handleMessage);
    
    // Cleanup: rimuovi l'event listener
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]); // Riesegui solo se il socket cambia

  /**
   * Invia un messaggio utente
   * @param {string} content - Contenuto del messaggio
   */
  const sendMessage = (content: string) => {
    if (!socket) return;
    
    // Crea oggetto messaggio utente
    const userMessage: Message = {
      id: Date.now().toString(),
      agent: 'user',
      content,
      timestamp: new Date().toISOString(),
      isUser: true,
    };
    
    // Aggiungi allo stato locale (optimistic update)
    setMessages(prev => [...prev, userMessage]);
    
    // Mostra indicatore di digitazione
    setIsTyping(true);
    
    // Invia al backend tramite WebSocket
    socket.send(JSON.stringify({
      task: content,
      timestamp: new Date().toISOString(),
    }));
  };

  return {
    messages,     // Array di messaggi
    sendMessage,  // Funzione per inviare messaggi
    isTyping      // Stato indicatore digitazione
  };
};