/**
 * @file components/Chat/ChatInput.tsx
 * @description Componente input per inviare messaggi nella chat
 * @purpose Fornire un'area di input intelligente con auto-resize
 * @dependencies React, styles/components.css
 * @used_in ChatContainer.tsx
 * @pattern Form Component Pattern
 */

import React, { useState, useRef, useEffect } from 'react';
import '../../styles/components.css';

/**
 * Interfaccia props per il componente ChatInput
 */
interface ChatInputProps {
  onSend: (message: string) => void;  // Callback per invio messaggio
  disabled?: boolean;                 // Stato disabilitato
}

/**
 * Componente input per la chat con auto-resize e invio rapido
 * @param {ChatInputProps} props - Props del componente
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  // Stato per il testo dell'input
  const [input, setInput] = useState('');
  // Ref per il textarea per manipolazione diretta
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Handler per l'invio del messaggio
   * @param {React.FormEvent} e - Evento form
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Invia solo se c'è testo e non è disabilitato
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput(''); // Svuota l'input dopo l'invio
    }
  };

  /**
   * Handler per la pressione dei tasti
   * @param {React.KeyboardEvent} e - Evento tastiera
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Invia con Enter (senza Shift per andare a capo)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Effetto per auto-resize del textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Resetta l'altezza
      textareaRef.current.style.height = 'auto';
      // Imposta l'altezza in base al contenuto (max 120px)
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [input]); // Riesegui quando l'input cambia

  return (
    <form className="chat-input-wrapper" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scrivi un messaggio..."
        disabled={disabled}
        className="chat-input"
        rows={1}
      />
      
      <div className="chat-input-actions">
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="send-button"
          title="Invia messaggio"
        >
          {/* Icona invio */}
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;