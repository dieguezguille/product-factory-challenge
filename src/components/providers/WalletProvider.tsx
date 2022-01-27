import React, {
  createContext,
  Dispatch,
  SetStateAction,
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
};

const defaultValues = {
  address: undefined,
  setAddress: () => {},
  chain: undefined,
  setChain: () => {},
  web3Provider: undefined,
  setWeb3Provider: () => {},
};

export const walletProviderContext =
  createContext<WalletProviderContextType>(defaultValues);

export const ProductFactoryProvider: React.FC = (props) => {
  const { children } = props;

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chain, setChain] = useState<string | undefined>(undefined);
  const [web3Provider, setWeb3Provider] = useState<Web3 | undefined>(undefined);

  const contextObject = {
    address,
    setAddress,
    chain,
    setChain,
    web3Provider,
    setWeb3Provider,
  };

  return (
    <walletProviderContext.Provider value={contextObject}>
      {children}
    </walletProviderContext.Provider>
  );
};

export default ProductFactoryProvider;
