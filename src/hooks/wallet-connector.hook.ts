/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import Web3 from 'web3';

type WalletConnectorReturnType = {
  connect: () => Promise<void>;
  disconnect: () => void;
  address: string | undefined;
  chainId: number | undefined;
};

const useWalletConnector = (): WalletConnectorReturnType => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  const connect = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      const selectedAddress = await Web3.givenProvider.selectedAddress;
      setAddress(selectedAddress);
    }
  };

  const disconnect = () => {
    setAddress(undefined);
    setChainId(undefined);
  };

  useEffect(() => {
    if (window.ethereum?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log(`Account changed! New address: ${accounts[0]}`);
        setAddress(accounts[0]);
      };

      // const handleChainChanged = () => {
      //   window.location.reload();
      // };

      // const handleDisconnect = (error: { code: number; message: string }) => {
      //   // eslint-disable-next-line no-console
      //   console.log('disconnect', error.code, error.message);
      //   disconnect();
      // };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      // window.ethereum.on('chainChanged', handleChainChanged);
      // window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountsChanged,
          );
          // window.ethereum.removeListener('chainChanged', handleChainChanged);
          // window.ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }
    return () => {};
  }, []);

  return { connect, disconnect, address, chainId };
};

export default useWalletConnector;
