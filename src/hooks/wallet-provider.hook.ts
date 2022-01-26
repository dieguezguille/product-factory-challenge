/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

type WalletProviderReturnType = {
  connect: () => Promise<void>;
  disconnect: () => void;
  address: string | undefined;
  chain: string | undefined;
  web3Provider: Web3 | undefined;
};

const useWalletProvider = (): WalletProviderReturnType => {
  const { enqueueSnackbar } = useSnackbar();
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chain, setChain] = useState<string | undefined>(undefined);
  const [web3Provider, setWeb3Provider] = useState<Web3 | undefined>(undefined);

  const disconnect = useCallback(() => {
    setAddress(undefined);
    setChain(undefined);
    enqueueSnackbar('Disconnected from MetaMask', { variant: 'info' }); // Fake disconnect
  }, [enqueueSnackbar]);

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
    enqueueSnackbar('Connected to MetaMask', { variant: 'info' });
  };

  useEffect(() => {
    if (window.ethereum && !web3Provider) {
      setWeb3Provider(new Web3(window.ethereum));
      console.log('Injected Web3 Provider');
    }
  }, [window.ethereum]);

  // useEffect(() => {
  //   getWalletData();
  // }, [web3Provider, getWalletData]);

  useEffect(() => {
    checkChain();
  }, [address, chain]);

  // Subscribe to Metamask events
  useEffect(() => {
    if (window.ethereum?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        setAddress(accounts[0]);
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        disconnect();
        enqueueSnackbar(`Disconnected from Metamask: ${error.message}`, {
          variant: 'info',
        });
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

  return { connect, disconnect, address, chain, web3Provider };
};

export default useWalletProvider;
