import { useSnackbar } from 'notistack';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Web3 from 'web3';

type WalletProviderContextType = {
  address: string | undefined;
  setAddress: Dispatch<SetStateAction<string | undefined>>;
  chain: string | undefined;
  setChain: React.Dispatch<SetStateAction<string | undefined>>;
  web3Provider: Web3 | undefined;
  setWeb3Provider: Dispatch<SetStateAction<Web3 | undefined>>;
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
};

const defaultValues = {
  address: undefined,
  setAddress: () => {},
  chain: undefined,
  setChain: () => {},
  web3Provider: undefined,
  setWeb3Provider: () => {},
  connected: false,
  setConnected: () => {},
};

export const walletProviderContext =
  createContext<WalletProviderContextType>(defaultValues);

export const ProductFactoryProvider: React.FC = (props) => {
  const { children } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chain, setChain] = useState<string | undefined>(undefined);
  const [web3Provider, setWeb3Provider] = useState<Web3 | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);

  const contextObject = {
    address,
    setAddress,
    chain,
    setChain,
    web3Provider,
    setWeb3Provider,
    connected,
    setConnected,
  };

  useEffect(() => {
    if (connected) {
      enqueueSnackbar('Connected to MetaMask', { variant: 'info' });
    } else {
      enqueueSnackbar('Disconnected from MetaMask', { variant: 'info' });
    }
  }, [connected, enqueueSnackbar]);

  return (
    <walletProviderContext.Provider value={contextObject}>
      {children}
    </walletProviderContext.Provider>
  );
};

export default ProductFactoryProvider;
