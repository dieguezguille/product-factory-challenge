/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from 'notistack';
import { useCallback, useContext, useEffect } from 'react';
import Web3 from 'web3';

import { appContext } from '../components/providers/AppProvider';
import { walletProviderContext } from '../components/providers/WalletProvider';

export type WalletProviderHookReturnType = {
  connect: () => Promise<void>;
  disconnect: () => void;
};

const useWalletProvider = (): WalletProviderHookReturnType => {
  const { enqueueSnackbar } = useSnackbar();
  const { setShouldRefresh } = useContext(appContext);

  const {
    address,
    setAddress,
    chain,
    setChain,
    web3Provider,
    setWeb3Provider,
    setConnected,
  } = useContext(walletProviderContext);

  const disconnect = () => {
    setConnected(false);
    setAddress(undefined);
    setChain(undefined);
  };

  const checkChain = () => {
    if (chain && chain !== process.env.REACT_APP_TESTNET_ID) {
      disconnect();
      enqueueSnackbar(
        'Unsupported chain detected. Make sure to be in Polygon Testnet Mumbai',
        { variant: 'error' },
      );
    }
  };

  const getWalletData = useCallback(async () => {
    if (web3Provider) {
      const selectedAddress = await web3Provider.eth.accounts.givenProvider
        .selectedAddress;
      setAddress(selectedAddress);
      const selectedChain = await web3Provider.eth.accounts.givenProvider
        .chainId;
      setChain(selectedChain);
    }
  }, [web3Provider]);

  const connect = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    await getWalletData();
    setConnected(true);
    setShouldRefresh(true);
  };

  useEffect(() => {
    if (window.ethereum && !web3Provider) {
      setWeb3Provider(new Web3(window.ethereum));
    }
  }, [window.ethereum]);

  useEffect(() => {
    checkChain();
  }, [address, chain]);

  useEffect(() => {
    if (address) {
      setShouldRefresh(true);
    }
  }, [address]);

  useEffect(() => {
    if (window.ethereum?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          disconnect();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log(error);
        disconnect();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountsChanged,
          );
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          window.ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }
    return () => {};
  }, []);

  return { connect, disconnect };
};

export default useWalletProvider;
