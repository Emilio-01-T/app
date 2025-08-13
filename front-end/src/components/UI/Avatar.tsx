/**
 * @file components/UI/Avatar.tsx
 * @description Componente avatar per visualizzare immagini o iniziali
 * @purpose Fornire un avatar consistente per utenti e agenti
 * @dependencies React, styles/components.css
 * @used_in Sidebar.tsx, ChatMessage.tsx
 * @pattern Reusable Component Pattern
 */

import React from 'react';
import '../../styles/components.css';

/**
 * Interfaccia props per il componente Avatar
 */
interface AvatarProps {
  children?: React.ReactNode;   // Contenuto (solitamente iniziali)
  src?: string;                // URL immagine (opzionale)
  alt?: string;                // Testo alternativo per immagine
  size?: 'sm' | 'md' | 'lg';   // Dimensione (default: 'md')
  className?: string;           // Classi CSS aggiuntive
}

/**
 * Componente Avatar per visualizzare immagini o iniziali
 * @param {AvatarProps} props - Props del componente
 */
const Avatar: React.FC<AvatarProps> = ({ 
  children, 
  src, 
  alt = '', 
  size = 'md',
  className = '' 
}) => {
  // Mappa delle classi CSS per le dimensioni
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  return (
    <div 
      className={`avatar ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        // Se c'è un'immagine, mostra l'immagine
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        // Altrimenti mostra il contenuto (solitamente iniziali)
        children
      )}
    </div>
  );
};

export default Avatar;