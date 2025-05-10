// src/index.js or src/main.jsx (depending on your project setup)
import React from 'react';
import ReactDOM from 'react-dom/client'; // or 'react-dom'
import './index.css';  // Import your global CSS
import App from './App';  // Ensure the correct path to App component
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
