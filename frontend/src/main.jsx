import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices/store.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  // On crée la racine avec ReactDOM.createRoot
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('L\'élément avec l\'ID "root" n\'a pas été trouvé.');
}
