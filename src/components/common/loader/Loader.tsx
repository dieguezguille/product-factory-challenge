import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

import { appContext } from '../../providers/AppProvider';

const Loader: React.FC = () => {
  const { isLoading } = React.useContext(appContext);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
