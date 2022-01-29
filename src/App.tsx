import React from 'react';

import Loader from './components/common/loader/Loader';
import Routes from './routes/Routes';

function App(): JSX.Element {
  return (
    <>
      <Loader />
      <Routes />
    </>
  );
}

export default App;
