import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  IconButton,
  Link,
  LinkProps,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../../enums/routes.enum';
import WalletConnector from '../wallet-connector/WalletConnector';

type AppBarProps = {
  handleDrawerToggle?: () => void;
};

const LinkCustom = styled((props: LinkProps) => <Link {...props} />)({
  '&:hover': {
    cursor: 'pointer',
  },
});

const AppBarCustom: React.FC<AppBarProps> = (props) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(RoutesEnum.BASE, { replace: true });
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.snackbar - 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, mr: 2, display: { xs: 'none', sm: 'flex' } }}
        >
          <LinkCustom
            className="logo"
            underline="none"
            color="inherit"
            onClick={handleNavigation}
          >
            ⚙️ Product Factory
          </LinkCustom>
        </Typography>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
        >
          <LinkCustom
            className="logo"
            underline="none"
            color="inherit"
            onClick={handleNavigation}
          >
            ⚙️
          </LinkCustom>
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <WalletConnector
            tooltipConnected="Disconnect"
            tooltipDisconnected="Connect Metamask"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarCustom;
