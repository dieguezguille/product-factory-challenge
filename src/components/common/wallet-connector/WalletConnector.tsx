/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, ButtonProps, Tooltip } from '@mui/material';
import React from 'react';

import useWalletConnector from '../../../hooks/wallet-connector.hook';

type WalletConnectorProps = {
  tooltipConnected: string;
  tooltipDisconnected: string;
} & ButtonProps;

export const WalletConnector: React.FC<WalletConnectorProps> = ({
  tooltipConnected,
  tooltipDisconnected,
  ...rest
}) => {
  const { connect, disconnect, address } = useWalletConnector();

  const getWalletaddress = (walletAddress: string) =>
    `${String(walletAddress).substring(0, 6)}...${String(
      walletAddress,
    ).substring(38)}`;

  const handleWalletConnection = async () => {
    if (address) {
      disconnect();
      return;
    }
    await connect();
  };

  return (
    <Tooltip
      title={address ? tooltipConnected : tooltipDisconnected}
      placement="bottom"
    >
      <Button
        {...rest}
        onClick={handleWalletConnection}
        color="inherit"
        size="large"
        sx={{ mr: 2 }}
        startIcon={<AccountBalanceWalletIcon />}
      >
        {address ? `${getWalletaddress(address)}` : 'Connect'}
      </Button>
    </Tooltip>
  );
};

export default WalletConnector;