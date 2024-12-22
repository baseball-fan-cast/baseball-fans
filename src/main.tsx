import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';

import '@radix-ui/themes/styles.css';
import './index.css';
import './output.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
