import React from 'react';
import { createRoot } from 'react-dom/client';

import {BrowserRouter as Router} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_TOKEN}>
      <App />
    </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);

