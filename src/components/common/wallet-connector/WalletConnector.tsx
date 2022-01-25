import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, ButtonProps, Tooltip } from '@mui/material';
import React, { useState } from 'react';

type WalletConnectorProps = {
  tooltipConnected: string;
  tooltipDisconnected: string;
} & ButtonProps;

export const WalletConnector: React.FC<WalletConnectorProps> = ({
  tooltipConnected,
  tooltipDisconnected,
  ...rest
}) => {
  const [connected, setConnected] = useState(false);

  const getWalletaddress = (walletAddress: string) =>
    `${String(walletAddress).substring(0, 6)}...${String(
      walletAddress,
    ).substring(38)}`;

  return (
    <Tooltip
      title={connected ? tooltipConnected : tooltipDisconnected}
      placement="bottom"
    >
      <Button
        {...rest}
        onClick={() => setConnected(!connected)}
        color="inherit"
        size="large"
        sx={{ mr: 2 }}
        startIcon={<AccountBalanceWalletIcon />}
      >
        {connected
          ? `${getWalletaddress('0xd9E0b2C0724F3a01AaECe3C44F8023371f845196')}`
          : 'Connect Wallet'}
      </Button>
    </Tooltip>
  );
};

export default WalletConnector;
