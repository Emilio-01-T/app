/**
 * @file src/App.tsx
 * @description Componente root dell'applicazione
 * @purpose Punto di ingresso principale con provider di contesto
 * @dependencies React, contexts/ThemeContext.tsx, components/Layout/MainLayout.tsx, styles/theme.css, styles/layout.css, styles/components.css
 * @used_in index.tsx
 * @pattern Root Component Pattern
 */

import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/Layout/MainLayout';
import './styles/variables.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';
import './styles/animations.css';
import './styles/base.css';
/**
 * Componente root dell'applicazione
 * Fornisce i provider globali e renderizza il layout principale
 */
function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;