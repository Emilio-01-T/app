/**
 * @file contexts/ThemeContext.tsx
 * @description Contesto React per gestire il tema dell'applicazione
 * @purpose Fornire un tema globale a tutti i componenti con persistenza
 * @dependencies React, useLocalStorage.ts, types/index.ts
 * @used_in App.tsx, Sidebar.tsx, ChatContainer.tsx
 * @pattern Context API Pattern
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Definizione tipo per il contesto
type ThemeContextType = {
  theme: Theme;                           // Tema corrente
  toggleTheme: () => void;               // Funzione per cambiare tema
  setPrimaryColor: (color: string) => void; // Funzione per cambiare colore primario
};

// Creazione del contesto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook per usare il contesto tema
 * @returns {ThemeContextType} Contesto tema
 * @throws {Error} Se usato fuori da un ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve essere usato all\'interno di un ThemeProvider');
  }
  return context;
};

/**
 * Provider per il contesto tema
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componenti figli
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Stato tema con persistenza nel localStorage
  const [theme, setTheme] = useLocalStorage<Theme>('theme', {
    mode: 'dark',                    // Modalità di default
    primaryColor: '#4a6fa5',        // Colore primario di default
    secondaryColor: '#6c757d',      // Colore secondario di default
  });

  // Effetto per applicare il tema al DOM
  useEffect(() => {
    // Imposta l'attributo data-theme per il CSS
    document.documentElement.setAttribute('data-theme', theme.mode);
    // Imposta le variabili CSS per i colori
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
  }, [theme]); // Riesegui quando il tema cambia

  /**
   * Funzione per alternare tra tema chiaro e scuro
   */
  const toggleTheme = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  /**
   * Funzione per cambiare il colore primario
   * @param {string} color - Nuovo colore primario
   */
  const setPrimaryColor = (color: string) => {
    setTheme(prev => ({ ...prev, primaryColor: color }));
  };

  // Fornisci il contesto ai componenti figli
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};