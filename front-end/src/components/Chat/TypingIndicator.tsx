/**
 * @file components/Chat/TypingIndicator.tsx
 * @description Componente animato per indicare che un agente sta scrivendo
 * @purpose Fornire feedback visivo durante l'elaborazione delle risposte
 * @dependencies React, styles/components.css
 * @used_in ChatContainer.tsx
 * @pattern Loading Indicator Pattern
 */

import React from 'react';
import '../../styles/components.css';

/**
 * Componente TypingIndicator con animazione a tre puntini
 * Mostra che un agente AI sta elaborando una risposta
 */
const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator">
      {/* Tre puntini animati */}
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      {/* Testo descrittivo */}
      <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Sta scrivendo...
      </span>
    </div>
  );
};

export default TypingIndicator;