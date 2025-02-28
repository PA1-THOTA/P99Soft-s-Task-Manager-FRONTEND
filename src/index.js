import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './css/universal.css'
import UsercontextProvider from './Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsercontextProvider>
    <BrowserRouter>
      <div id="body">
        <App/>
      </div>
    </BrowserRouter>
  </UsercontextProvider>
);
