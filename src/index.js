import React from 'react';
import ReactDOM from 'react-dom/client';

import { HelmetProvider } from "react-helmet-async";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { ThemeProvider } from "./context/ThemeContext";

import './i18n'

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();