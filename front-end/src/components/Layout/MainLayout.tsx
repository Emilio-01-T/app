/**
 * @file components/Layout/MainLayout.tsx
 * @description Layout principale ottimizzato per performance
 */
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import ChatContainer from './ChatContainer';
import { useChatHistory } from '../../hooks/useChatHistory';
import { useWebSocket } from '../../hooks/useWebSocket';
import '../../styles/layout.css';

const MainLayout: React.FC = () => {
  const {
    sessions,
    createNewSession,
    getCurrentSession,
    updateSession,
    deleteSession,
    currentSessionId,
  } = useChatHistory();
  
  const { status, sendMessage, socket } = useWebSocket('ws://localhost:8000/ws/agent-team');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarLocked, setIsSidebarLocked] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      console.log('[MainLayout] isMobile:', mobile);
      setIsMobile(mobile);
      if (mobile) setIsSidebarVisible(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNewChat = useCallback(() => {
    const newSession = createNewSession();
    console.log('[MainLayout] Chat creata manualmente:', newSession);
  }, [createNewSession]);

  const handleSendMessage = useCallback(
    (content: string) => {
      console.log('[MainLayout] handleSendMessage called con:', content);
      let currentSession = getCurrentSession();
      console.log('[MainLayout] getCurrentSession() =', currentSession);
      
      // Se non c'è una sessione corrente, creane una nuova
      if (!currentSession) {
        console.log('[MainLayout] Nessuna sessione corrente → creazione automatica');
        currentSession = createNewSession();
        console.log('[MainLayout] Sessione creata automaticamente:', currentSession);
      }
      
      if (!currentSession) {
        console.warn('[MainLayout] Impossibile creare o trovare sessione');
        return;
      }
      
      const userMessage = {
        id: Date.now().toString(),
        agent: 'user',
        content,
        timestamp: new Date().toISOString(),
        isUser: true,
      };
      
      console.log('[MainLayout] Messaggio da salvare:', userMessage);
      
      // Aggiorna la sessione con il nuovo messaggio
      updateSession(currentSession.id, {
        messages: [...currentSession.messages, userMessage],
      });
      
      console.log('[MainLayout] Sessione aggiornata:', currentSession);
      
      const ws = socket as WebSocket | null;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            task: content,
            sessionId: currentSession.id,
            timestamp: new Date().toISOString(),
          })
        );
        console.log('[MainLayout] Messaggio inviato via WebSocket');
      } else {
        console.log('[MainLayout] WebSocket non disponibile o chiuso');
      }
    },
    [getCurrentSession, createNewSession, updateSession, socket]
  );

  const handleToggleSidebarVisibility = useCallback(
    () => setIsSidebarVisible(prev => !prev),
    []
  );

  const handleToggleSidebarLock = useCallback(
    () => setIsSidebarLocked(prev => !prev),
    []
  );

  console.log('[MainLayout] Render - sessions:', sessions);
  console.log('[MainLayout] Render - currentSessionId:', currentSessionId);

  return (
    <div className="app-container">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onDeleteSession={deleteSession}
        onSelectSession={() => {}} // non usato
        isLocked={isSidebarLocked}
        onToggleLock={handleToggleSidebarLock}
        isVisible={isSidebarVisible}
        onToggleVisibility={handleToggleSidebarVisibility}
      />
      <div className={`main-content ${!isSidebarVisible ? 'sidebar-hidden' : ''}`}>
        <ChatContainer
          status={status}
          onSendMessage={handleSendMessage}
          socket={socket as WebSocket | null}
          onToggleSidebar={handleToggleSidebarVisibility}
        />
      </div>
    </div>
  );
};

export default MainLayout;