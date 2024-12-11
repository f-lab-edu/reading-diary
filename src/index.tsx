import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './scss/style.scss';

import Index from 'components/common/Layout';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Index>
        <App />
      </Index>
    </BrowserRouter>
  </React.StrictMode>,
);
