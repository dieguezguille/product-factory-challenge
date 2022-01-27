import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './App';
import ProductFactoryProvider from './components/providers/ProductFactoryProvider';
import WalletProvider from './components/providers/WalletProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={5}>
        <WalletProvider>
          <ProductFactoryProvider>
            <App />
          </ProductFactoryProvider>
        </WalletProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
