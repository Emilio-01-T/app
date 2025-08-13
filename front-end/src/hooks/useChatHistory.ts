/**
 * @file hooks/useChatHistory.ts
 * @description Hook per gestire la cronologia delle chat con persistenza corretta
 */
import { useCallback, useEffect } from 'react';
import { ChatSession } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useChatHistory = () => {
  const [sessions, setSessions] = useLocalStorage<ChatSession[]>('chat-sessions', []);
  const [currentSessionId, setCurrentSessionId] = useLocalStorage<string>('current-session', '');

  // Inizializza la sessione corrente se non esiste
  useEffect(() => {
    if (!currentSessionId && sessions.length > 0) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [sessions, currentSessionId, setCurrentSessionId]);

  const createNewSession = useCallback(() => {
    console.log('useChatHistory: Creazione nuova sessione');
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${new Date().toLocaleTimeString()}`, // Titolo più specifico
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    
    setSessions(prev => {
      const newSessions = [newSession, ...prev];
      console.log('useChatHistory: Sessions aggiornate:', newSessions);
      return newSessions;
    });
    
    setCurrentSessionId(newSession.id);
    console.log('useChatHistory: Sessione corrente impostata:', newSession.id);
    
    return newSession;
  }, [setSessions, setCurrentSessionId]);

  const updateSession = useCallback((sessionId: string, updates: Partial<ChatSession>) => {
    console.log('useChatHistory: Aggiornamento sessione', sessionId, updates);
    setSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, ...updates, updatedAt: new Date().toISOString() }
          : session
      )
    );
  }, [setSessions]);

  const deleteSession = useCallback((sessionId: string) => {
    console.log('useChatHistory: Eliminazione sessione', sessionId);
    setSessions(prev => {
      const newSessions = prev.filter(session => session.id !== sessionId);
      console.log('useChatHistory: Sessions dopo eliminazione:', newSessions);
      return newSessions;
    });
    
    if (currentSessionId === sessionId) {
      const newCurrentId = sessions.length > 1 ? sessions.find(s => s.id !== sessionId)?.id || '' : '';
      setCurrentSessionId(newCurrentId);
      console.log('useChatHistory: Nuova sessione corrente:', newCurrentId);
    }
  }, [setSessions, currentSessionId, setCurrentSessionId, sessions]);

  const getCurrentSession = useCallback(() => {
    const session = sessions.find(session => session.id === currentSessionId);
    console.log('useChatHistory: Sessione corrente trovata:', session);
    return session;
  }, [sessions, currentSessionId]);

  return {
    sessions,
    currentSessionId,
    setCurrentSessionId,
    createNewSession,
    updateSession,
    deleteSession,
    getCurrentSession,
  };
};