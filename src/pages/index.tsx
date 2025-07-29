import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from '../context/AuthContext';
import Popup from './Popup';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Popup />
    </AuthProvider>
  </React.StrictMode>
);
