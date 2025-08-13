/**
 * @file types/index.ts
 * @description Definisce tutti i tipi TypeScript utilizzati nell'applicazione
 * @purpose Fornire una tipizzazione forte per tutta l'applicazione
 * @dependencies Nessuna
 * @used_in Tutti i componenti e hook che utilizzano messaggi, sessioni di chat o stati di connessione
 */

// Interfaccia per un singolo messaggio nella chat
export interface Message {
  id: string;                    // ID univoco del messaggio (solitamente timestamp)
  agent: string;                 // Nome dell'agente che ha inviato il messaggio
  content: string;               // Contenuto testuale del messaggio
  timestamp: string;             // Timestamp ISO della creazione
  isUser?: boolean;             // Flag per identificare messaggi utente (opzionale)
  avatar?: string;              // URL avatar personalizzato (opzionale)
}

// Interfaccia per una sessione di chat completa
export interface ChatSession {
  id: string;                    // ID univoco della sessione
  title: string;                 // Titolo della conversazione
  createdAt: string;             // Timestamp di creazione
  updatedAt: string;             // Timestamp ultimo aggiornamento
  messages: Message[];           // Array di messaggi nella sessione
}

// Interfaccia per messaggi WebSocket
export interface WebSocketMessage {
  type: 'agent_message' | 'error' | 'connection_status' | 'chat_history';
  agent?: string;                // Nome dell'agente (se applicabile)
  content: string;               // Contenuto del messaggio
  timestamp?: string;           // Timestamp (opzionale)
  sessionId?: string;           // ID sessione (opzionale)
}

// Interfaccia per stato connessione WebSocket
export interface ConnectionStatus {
  connected: boolean;            // Stato della connessione
  error?: string;               // Messaggio di errore (se presente)
}

// Interfaccia per configurazione tema
export interface Theme {
  mode: 'light' | 'dark';       // Modalità tema
  primaryColor: string;          // Colore primario
  secondaryColor: string;        // Colore secondario
}