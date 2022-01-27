import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Contract } from 'web3-eth-contract';

import { IProduct } from '../../interfaces/product.interface';

type ProductFactoryContextType = {
  contract: Contract | undefined;
  setContract: Dispatch<SetStateAction<Contract | undefined>>;
  products: Array<IProduct | undefined>;
  setProducts: Dispatch<SetStateAction<(IProduct | undefined)[]>>;
  productsSize: number;
  setProductsSize: Dispatch<SetStateAction<number>>;
  pendingDelegations: Array<IProduct | undefined>;
  setPendingDelegations: Dispatch<SetStateAction<(IProduct | undefined)[]>>;
};

const defaultValues = {
  contract: undefined,
  setContract: () => {},
  products: [],
  setProducts: () => {},
  productsSize: 0,
  setProductsSize: () => {},
  pendingDelegations: [],
  setPendingDelegations: () => {},
};

export const productFactoryContext =
  createContext<ProductFactoryContextType>(defaultValues);

export const ProductFactoryProvider: React.FC = (props) => {
  const { children } = props;

  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [products, setProducts] = useState<Array<IProduct | undefined>>([]);
  const [productsSize, setProductsSize] = useState<number>(0);
  const [pendingDelegations, setPendingDelegations] = useState<
    Array<IProduct | undefined>
  >([]);

  const contextObject = {
    contract,
    setContract,
    products,
    setProducts,
    productsSize,
    setProductsSize,
    pendingDelegations,
    setPendingDelegations,
  };

  return (
    <productFactoryContext.Provider value={contextObject}>
      {children}
    </productFactoryContext.Provider>
  );
};

export default ProductFactoryProvider;
