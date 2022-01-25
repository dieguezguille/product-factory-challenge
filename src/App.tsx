import React from 'react';
import { CssBaseline } from '@mui/material';

import Routes from './routes/Routes';

function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <Routes />
    </>
  );
}

export default App;
