import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Make sure App.jsx also exists
import './index.css'; // Optional
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>
);