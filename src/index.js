import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router  } from 'react-router-dom'
import { ContextProvider } from './context/ContextGlobal';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/stores';
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <ContextProvider>
          <Router>
            <App />
          </Router>
        </ContextProvider>
    </ReduxProvider>
  </React.StrictMode>
);

