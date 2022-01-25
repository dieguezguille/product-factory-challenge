import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import AppBar from '../app-bar/AppBar';

const drawerWidth = 240;

type ResponsiveDrawerProps = {
  drawerContent: React.ReactNode;
};

const boxShadow =
  '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)';

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar handleDrawerToggle={handleDrawerToggle} />

      {/* Navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          className="drawer"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            'display': { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              boxShadow,
            },
          }}
        >
          {props.drawerContent}
        </Drawer>
        <Drawer
          className="drawer"
          variant="permanent"
          sx={{
            'display': { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              boxShadow,
            },
          }}
          open
        >
          {props.drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
            padding: '20px 10vh',
            paddingTop: '90px',
          },
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
