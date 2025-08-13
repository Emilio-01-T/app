/**
 * @file components/Layout/Sidebar.tsx
 * @description Componente sidebar interattivo con creazione chat migliorata
 */
import React, { useState } from 'react';
import Button from '../UI/Button';
import Avatar from '../UI/Avatar';
import '../../styles/layout.css';
import type { ChatSession } from '../../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  onSelectSession: (sessionId: string) => void;
  isLocked: boolean;
  onToggleLock: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onDeleteSession,
  onSelectSession,
  isLocked,
  isVisible,
  onToggleVisibility
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Ieri';
    if (diffDays < 7) return `${diffDays} giorni fa`;
    return date.toLocaleDateString();
  };

  const handleDeleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setDeletingId(sessionId);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      onDeleteSession(sessionId);
    } catch (error) {
      console.error('Errore eliminazione chat:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleChatSelect = (sessionId: string) => {
    console.log('Sidebar: Selezione chat:', sessionId);
    onSelectSession(sessionId);
    if (window.innerWidth <= 768) onToggleVisibility();
  };

  const handleNewChatClick = () => {
    console.log('Sidebar: Clic su nuova chat');
    onNewChat();
  };

  return (
    <>
      {isVisible && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={onToggleVisibility} />
      )}

      <div className={`sidebar ${isVisible ? 'open' : 'closed'} ${isLocked ? 'locked' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
            <span className="brand-name">Team AI</span>
          </div>
        </div>

        <div className="new-chat-container">
          <Button onClick={handleNewChatClick} className="new-chat-button">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuova Chat
          </Button>
        </div>

        <div className="chat-history">
          {sessions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <div className="empty-text">
                <h3>Nessuna conversazione</h3>
                <p>Inizia una nuova chat per vedere le tue conversazioni qui</p>
              </div>
            </div>
          ) : (
            <div className="chat-list">
              {sessions.map(session => (
                <div
                  key={session.id}
                  className={`chat-item ${
                    session.id === currentSessionId ? 'active' : ''
                  } ${deletingId === session.id ? 'deleting' : ''}`}
                  onClick={() => handleChatSelect(session.id)}
                  onMouseEnter={() => setHoveredItem(session.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="chat-item-content">
                    <div className="chat-item-header">
                      <div className="chat-item-title">{session.title}</div>
                      <div className="chat-item-date">{formatDate(session.updatedAt)}</div>
                    </div>

                    {session.messages.length > 0 && (
                      <div className="chat-item-preview">
                        {session.messages[0].content.substring(0, 60)}
                        {session.messages[0].content.length > 60 ? '...' : ''}
                      </div>
                    )}

                    <div className="chat-item-meta">
                      <span className="message-count">
                        {session.messages.length} messaggi
                      </span>
                    </div>
                  </div>

                  {(hoveredItem === session.id || session.id === currentSessionId) && (
                    <div className="chat-item-actions">
                      <button
                        onClick={(e) => handleDeleteSession(e, session.id)}
                        className="action-btn delete-btn"
                        title="Elimina chat"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <Avatar size="lg">U</Avatar>
            <div className="user-details">
              <div className="user-name">Utente</div>
              <div className="user-status">Online</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;