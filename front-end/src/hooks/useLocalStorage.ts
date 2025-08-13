/**
 * @file hooks/useLocalStorage.ts
 * @description Hook personalizzato per gestire il localStorage con TypeScript
 * @purpose Fornire un modo type-safe per salvare e recuperare dati dal localStorage
 * @dependencies React, tipo generico T
 * @used_in useChatHistory.ts, ThemeContext.tsx
 * @pattern Custom Hook Pattern
 */

import { useState, useEffect } from 'react';

/**
 * Hook per gestire dati nel localStorage con tipizzazione forte
 * @template T - Tipo del dato da memorizzare
 * @param {string} key - Chiave per il localStorage
 * @param {T} initialValue - Valore iniziale se non esiste nel localStorage
 * @returns {[T, (value: T | ((val: T) => T)) => void]} Tupla con valore e setter
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Stato per memorizzare il valore
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Verifica se siamo nel browser (non durante SSR)
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        // Parsea il JSON o ritorna il valore iniziale
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Errore nella lettura del localStorage chiave "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Funzione per impostare un valore nel localStorage
   * @param {T | ((val: T) => T)} value - Valore da impostare o funzione per calcolarlo
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Calcola il valore da memorizzare
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Aggiorna lo stato
      setStoredValue(valueToStore);
      // Salva nel localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Errore nell'impostazione del localStorage chiave "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}