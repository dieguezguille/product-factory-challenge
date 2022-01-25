/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
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

  return { connect, disconnect, address, chainId };
};

export default useWalletConnector;
