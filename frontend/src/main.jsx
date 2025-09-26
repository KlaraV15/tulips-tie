import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';

import AdminPanel from './Components/AdminPanel.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
