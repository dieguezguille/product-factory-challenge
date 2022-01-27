import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

import App from './App';
import ProductFactoryProvider from './components/providers/ProductFactoryProvider';
import WalletProvider from './components/providers/WalletProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={5}>
        <WalletProvider>
          <ProductFactoryProvider>
            <ThemeProvider theme={darkTheme}>
              <App />
            </ThemeProvider>
          </ProductFactoryProvider>
        </WalletProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
