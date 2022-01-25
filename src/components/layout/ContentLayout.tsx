import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import ResponsiveDrawer from '../common/responsive-drawer/ResponsiveDrawer';
import ToolbarContent from '../common/toolbar-content/ToolbarContent';

const ContentLayout: React.FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <ResponsiveDrawer drawerContent={<ToolbarContent />}>
      <Outlet />
    </ResponsiveDrawer>
  </Box>
);

export default ContentLayout;
