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
  loadProducts: (productSize: number) => Promise<Array<IProduct> | undefined>;
  createProduct: (name: string) => Promise<void>;
  delegateProduct: (productId: number, newOwner: string) => Promise<void>;
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

      const result = await contract.methods.products(index).call();
      const newProduct: IProduct = { ...result };
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

  const createProduct = async (name: string) => {
    console.log('contract:', contract, 'address:', address);
    if (!contract) {
      return;
    }

    const result = await contract.methods
      .createProduct(name)
      .send({ from: address });

    const receipt = result.events.NewProduct.returnValues;

    if (receipt) {
      console.log(receipt);
    }
  };

  const delegateProduct = async (productId: number, newOwner: string) => {
    console.log('contract:', contract, 'address:', address);
    if (!contract) {
      return;
    }

    const result = await contract.methods
      .delegateProduct(productId, newOwner)
      .send({ from: address });

    const receipt = result.events.DelegateProduct.returnValues;

    if (receipt) {
      console.log(receipt);
    }
  };

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

  return { products, loadProducts, createProduct, delegateProduct, size };
};

export default useProductFactory;
