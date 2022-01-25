import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import ResponsiveDrawer from '../common/responsive-drawer/ResponsiveDrawer';
import SidebarContent from '../common/sidebar-content/SidebarContent';

const ContentLayout: React.FC = () => (
  <Box sx={{ flexGrow: 1 }}>
    <ResponsiveDrawer sidebarContent={<SidebarContent />}>
      <Outlet />
    </ResponsiveDrawer>
  </Box>
);

export default ContentLayout;
