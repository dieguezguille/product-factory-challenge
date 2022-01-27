import { Stack, Typography } from '@mui/material';
import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Forbidden: React.FC = ({ ...props }) => (
  <Stack
    {...props}
    spacing={2}
    alignContent="center"
    alignItems="center"
    sx={{ opacity: '60%' }}
  >
    <AccountBalanceWalletIcon
      sx={{ width: '2em', height: '2em', opacity: '20%' }}
    />
    <Typography variant="body1">Connect wallet to continue</Typography>
  </Stack>
);

export default Forbidden;
