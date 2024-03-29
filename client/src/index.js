import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { StateProvider } from './context/StateProvide';
import { initialState } from './context/intialState';
import reducer from './context/reducer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <StateProvider initialState={ initialState} reducer={reducer}>
    <App />
    </StateProvider>
    </BrowserRouter>

  </React.StrictMode>
);

