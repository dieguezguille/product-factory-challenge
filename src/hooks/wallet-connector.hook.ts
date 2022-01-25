/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import Web3 from 'web3';

type WalletConnectorReturnType = {
  connect: () => Promise<void>;
  disconnect: () => void;
  address: string | undefined;
  chainId: string | undefined;
};

const useWalletConnector = (): WalletConnectorReturnType => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<string | undefined>(undefined);

  const loadAddress = async () => {
    const selectedAddress = await window.web3.eth.accounts.givenProvider
      .selectedAddress;
    setAddress(selectedAddress);
  };

  const loadChainId = async () => {
    const selectedChain = await window.web3.eth.accounts.givenProvider.chainId;
    setChainId(selectedChain);
  };

  const disconnect = () => {
    setAddress(undefined);
    setChainId(undefined);
  };

  const connect = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      await loadAddress();
      await loadChainId();
    }
  };

  useEffect(() => {
    if (chainId && chainId !== process.env.REACT_APP_TESTNET_ID) {
      disconnect();
      // eslint-disable-next-line no-alert
      alert(
        'Unsupported chain detected. Make sure to be in Polygon Testnet Mumbai',
      );
    }
  }, [chainId]);

  useEffect(() => {
    if (window.ethereum?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        setAddress(accounts[0]);
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      // const handleDisconnect = (error: { code: number; message: string }) => {
      //   // eslint-disable-next-line no-console
      //   console.log('disconnect', error.code, error.message);
      //   disconnect();
      // };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      // window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountsChanged,
          );
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          // window.ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }
    return () => {};
  }, []);

  return { connect, disconnect, address, chainId };
};

export default useWalletConnector;
