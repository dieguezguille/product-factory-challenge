/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect, useState } from 'react';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { useSnackbar } from 'notistack';

import ProductFactoryAbi from '../abis/ProductFactory.json';
import { IProduct } from '../interfaces/product.interface';

import useWalletProvider from './wallet-provider.hook';

type ProductFactoryReturnType = {
  products: Array<IProduct>;
  getAllProducts: (productSize: number) => Promise<void>;
  createProduct: (name: string) => Promise<void>;
  delegateProduct: (productId: number, newOwner: string) => Promise<void>;
  pendingDelegations: Array<IProduct>;
  getPendingDelegations: () => void;
  acceptProduct: (productId: number) => Promise<void>;
  size: number;
};

const useProductFactory = (): ProductFactoryReturnType => {
  // Dependencies
  const { enqueueSnackbar } = useSnackbar();
  const { web3Provider, address } = useWalletProvider();

  // State
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [size, setSize] = useState<number>(0);
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [pendingDelegations, setPendingDelegations] = useState<Array<IProduct>>(
    [],
  );

  // Functions
  const loadContract = useCallback(() => {
    if (web3Provider && !contract) {
      const loadedContract = new web3Provider.eth.Contract(
        ProductFactoryAbi as AbiItem[],
        process.env.REACT_APP_CONTRACT_ADDRESS,
      );
      setContract(loadedContract);
      console.log('ProductFactory Contract Found');
    } else {
      enqueueSnackbar('ProductFactory Contract Not Found', {
        variant: 'error',
      });
    }
  }, [contract, enqueueSnackbar, web3Provider]);

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
      const newProduct: IProduct = { ...result, id: index };
      return newProduct;
    },
    [contract],
  );

  const getAllProducts = useCallback(
    async (productsSize: number) => {
      for (let i = 0; i < productsSize; i += 1) {
        console.log(i);
        await getProductByIndex(i).then((result) => {
          if (result) {
            setProducts((prev) => [...prev, result]);
          }
        });
      }
    },
    [getProductByIndex],
  );

  const getPendingDelegations = useCallback(() => {
    if (address) {
      const delegations = products.filter(
        (product) =>
          product.status.toString() === '1' &&
          product.newOwner.toLowerCase() === address?.toLowerCase(),
      );

      console.log('delegations:', delegations);
      setPendingDelegations(delegations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const createProduct = async (name: string) => {
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

  const acceptProduct = async (productId: number) => {
    if (!contract) {
      return;
    }

    const result = await contract.methods
      .acceptProduct(productId)
      .send({ from: address });

    const receipt = result.events.AcceptProduct.returnValues;

    if (receipt) {
      console.log(receipt);
    }
  };

  // useEffect(() => {
  //   if (size > 0) {
  //     getAllProducts(size);
  //   }
  // }, [size, getAllProducts]);

  // useEffect(() => {
  //   if (contract) {
  //     getProductsSize();
  //   }
  // }, [contract, getProductsSize]);

  useEffect(() => {
    if (web3Provider) {
      loadContract();
    }
  }, [web3Provider]);

  return {
    products,
    getAllProducts,
    createProduct,
    delegateProduct,
    pendingDelegations,
    getPendingDelegations,
    acceptProduct,
    size,
  };
};

export default useProductFactory;
