/**
 * @file hooks/useWebSocket.ts
 * @description Hook per gestire connessioni WebSocket con stato e cleanup
 * @purpose Fornire una connessione WebSocket persistente con gestione errori
 * @dependencies React, types/index.ts
 * @used_in MainLayout.tsx, ChatContainer.tsx
 * @pattern Connection Management Pattern
 */

import { useState, useEffect } from 'react';
import type { ConnectionStatus } from '../types';

/**
 * Hook per gestire una connessione WebSocket
 * @param {string} url - URL del server WebSocket
 * @returns {Object} Oggetto con stato connessione e funzioni di comunicazione
 */
// export const useWebSocket = (url: string) => {
//   // Stato della connessione
//   const [status, setStatus] = useState<ConnectionStatus>({ connected: false });
//   // Istanza WebSocket
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     // Crea una nuova connessione WebSocket
//     const ws = new WebSocket(url);
    
//     // Handler per connessione stabilita
//     ws.onopen = () => {
//       console.log('WebSocket connesso');
//       setStatus({ connected: true });
//     };
    
//     // Handler per chiusura connessione
//     ws.onclose = () => {
//       console.log('WebSocket disconnesso');
//       setStatus({ connected: false });
//     };
    
//     // Handler per errori
//     ws.onerror = (e: Event) => {
//       console.error('Errore WebSocket:', e);
//       setStatus({ 
//         connected: false, 
//         error: (e as ErrorEvent).message // Estrai messaggio errore
//       });
//     };
    
//     // Salva l'istanza WebSocket
//     setSocket(ws);
    
//     // Cleanup: chiudi la connessione quando il componente viene smontato
//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//     };
//   }, [url]); // Riesegui solo se l'URL cambia

//   /**
//    * Invia un messaggio tramite WebSocket
//    * @param {string} message - Messaggio da inviare
//    */
//   const sendMessage = (message: string) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(message);
//       console.log('Messaggio inviato:', message);
//     } else {
//       console.warn('WebSocket non connesso, impossibile inviare messaggio');
//     }
//   };

//   return { 
//     status,      // Stato connessione
//     sendMessage, // Funzione per inviare messaggi
//     socket       // Istanza WebSocket (per usi avanzati)
//   };
// };
//MOCK: Simula una connessione WebSocket per testare il layout senza backend reale
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState({ connected: true }); // Mock connesso
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setStatus({ connected: true }); // Simula connessione
  }, [url]);

  const sendMessage = (message: string) => {
    console.log('Mock invio:', message);
    // Simula risposta dopo 1 secondo
    setTimeout(() => {
      console.log('Mock risposta ricevuta');
    }, 1000);
  };

  return { status, sendMessage, socket };
};