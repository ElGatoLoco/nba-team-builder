import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { combineComponents } from './common/utils/combineComponents';
import { NavigationContextProvider } from './features/navigation/NavigationContext';
import { ThemeContextProvider } from './features/theming/ThemeContext';

const AppContext = combineComponents(ThemeContextProvider, NavigationContextProvider);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContext>
    <App />
  </AppContext>,
);
