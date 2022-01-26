/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect, useState } from 'react';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

import ProductFactoryAbi from '../abis/ProductFactory.json';
import { IProduct } from '../interfaces/product.interface';

import useWalletConnector from './wallet-connector.hook';

type ProductFactoryReturnType = {
  products: Array<IProduct>;
  size: number;
};

const useProductFactory = (): ProductFactoryReturnType => {
  const { address } = useWalletConnector();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [size, setSize] = useState<number>(0);
  const [products, setProducts] = useState<Array<IProduct>>([]);

  const loadContract = () => {
    const loadedContract = new window.web3.eth.Contract(
      ProductFactoryAbi as AbiItem[],
      process.env.REACT_APP_CONTRACT_ADDRESS,
    );
    setContract(loadedContract);
  };

  const getProductsSize = useCallback(async (): Promise<number | void> => {
    if (!contract) {
      return;
    }

    const result: number = await contract.methods.size().call();
    setSize(result);
  }, [contract]);

  const getProductByIndex = useCallback(
    async (index: number): Promise<IProduct | undefined> => {
      if (!contract) {
        return undefined;
      }

      const receipt = await contract.methods.products(index).call();
      const newProduct: IProduct = { ...receipt };
      return newProduct;
    },
    [contract],
  );

  const loadProducts = useCallback(
    async (productsSize: number): Promise<Array<IProduct> | undefined> => {
      if (!contract) {
        return;
      }

      for (let i = 0; i < productsSize; i += 1) {
        console.log(i);
        await getProductByIndex(i).then((result) => {
          if (result) {
            setProducts((prev) => [...prev, result]);
          }
        });
      }
    },
    [contract, getProductByIndex],
  );

  useEffect(() => {
    if (size > 0) {
      loadProducts(size);
    }
  }, [size, loadProducts]);

  useEffect(() => {
    if (address) {
      loadContract();
    }
  }, [address]);

  useEffect(() => {
    if (contract) {
      getProductsSize();
    }
  }, [contract, getProductsSize]);

  return { products, size };
};

export default useProductFactory;
