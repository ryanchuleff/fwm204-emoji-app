import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AmplifyProvider>
      <div id="emoji-body">
        <App />
      </div>
    </AmplifyProvider>
  </React.StrictMode>,
);
