/**
 * @file components/UI/Button.tsx
 * @description Componente button riutilizzabile con varianti e dimensioni
 * @purpose Fornire un button consistente in tutta l'applicazione
 * @dependencies React, styles/components.css
 * @used_in Sidebar.tsx, ChatContainer.tsx, ChatInput.tsx
 * @pattern Reusable Component Pattern
 */

import React from 'react';
import '../../styles/components.css';

/**
 * Interfaccia props per il componente Button
 */
interface ButtonProps {
  children: React.ReactNode;           // Contenuto del button
  onClick?: () => void;               // Handler click
  type?: 'button' | 'submit' | 'reset'; // Tipo button (default: 'button')
  variant?: 'primary' | 'secondary' | 'ghost'; // Variante stilistica
  size?: 'sm' | 'md' | 'lg';          // Dimensione (default: 'md')
  disabled?: boolean;                 // Stato disabilitato
  className?: string;                 // Classi CSS aggiuntive
  icon?: React.ReactNode;             // Icona opzionale
}

/**
 * Componente Button riutilizzabile
 * @param {ButtonProps} props - Props del componente
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'secondary',
  size = 'md',
  disabled = false,
  className = '',
  icon
}) => {
  // Mappa delle classi CSS per le dimensioni
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  };

  // Mappa delle classi CSS per le varianti
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    ghost: 'bg-transparent border-transparent hover:bg-gray-100'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        button 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
      `}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;