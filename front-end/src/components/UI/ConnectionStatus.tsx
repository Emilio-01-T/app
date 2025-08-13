/**
 * @file components/UI/ConnectionStatus.tsx
 * @description Componente per visualizzare lo stato della connessione WebSocket
 * @purpose Mostrare visivamente se l'app è connessa al backend
 * @dependencies React, types/index.ts, styles/components.css
 * @used_in ChatContainer.tsx
 * @pattern Status Indicator Pattern
 */

import React from 'react';
import type { ConnectionStatus } from '../../types';
import '../../styles/components.css';

/**
 * Interfaccia props per il componente ConnectionStatus
 */
interface ConnectionStatusProps {
  status: ConnectionStatus;  // Stato della connessione
}

/**
 * Componente per visualizzare lo stato della connessione
 * @param {ConnectionStatusProps} props - Props del componente
 */
const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  return (
    <div className={`connection-status ${status.connected ? 'connected' : 'disconnected'}`}>
      {/* Indicatore visivo (cerchio animato) */}
      <div className="status-indicator"></div>
      {/* Testo descrittivo */}
      <span>
        {status.connected ? 'Connesso' : 'Disconnesso'}
        {status.error && ` - ${status.error}`}
      </span>
    </div>
  );
};

export default ConnectionStatus;