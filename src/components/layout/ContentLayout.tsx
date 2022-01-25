import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import ResponsiveDrawer from '../common/responsive-drawer/ResponsiveDrawer';

const ContentLayout: React.FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <ResponsiveDrawer>
      <Outlet />
    </ResponsiveDrawer>
  </Box>
);

export default ContentLayout;
