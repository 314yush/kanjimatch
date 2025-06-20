import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AudioProvider } from './contexts/AudioProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrivyProvider
        appId={process.env.REACT_APP_PRIVY_APP_ID || 'cltxxxxxxxxxxxxxxxxxxxxxxxxxx'}
        config={{
          loginMethods: ['email', 'wallet'],
          appearance: {
            theme: 'light',
            accentColor: '#2563eb',
            showWalletLoginFirst: false,
          },
        }}
      >
        <BrowserRouter>
          <AudioProvider>
            <App />
          </AudioProvider>
        </BrowserRouter>
    </PrivyProvider>
  </React.StrictMode>
);

reportWebVitals();
