/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useContext, useEffect } from 'react';
import { AbiItem } from 'web3-utils';
import { useSnackbar } from 'notistack';

import ProductFactoryAbi from '../abis/ProductFactory.json';
import { IProduct } from '../interfaces/product.interface';
import { productFactoryContext } from '../components/providers/ProductFactoryProvider';
import { walletProviderContext } from '../components/providers/WalletProvider';

export type ProductFactoryHookReturnType = {
  getAllProducts: () => Promise<void>;
  createProduct: (name: string) => Promise<void>;
  delegateProduct: (productId: number, newOwner: string) => Promise<void>;
  getPendingDelegations: () => void;
  acceptProduct: (productId: number) => Promise<void>;
};

const useProductFactory = (): ProductFactoryHookReturnType => {
  const { enqueueSnackbar } = useSnackbar();
  const { web3Provider, address } = useContext(walletProviderContext);
  const {
    contract,
    setContract,
    products,
    setProducts,
    productsSize,
    setProductsSize,
    setPendingDelegations,
  } = useContext(productFactoryContext);

  const loadContract = useCallback(() => {
    if (web3Provider && !contract) {
      const loadedContract = new web3Provider.eth.Contract(
        ProductFactoryAbi as AbiItem[],
        process.env.REACT_APP_CONTRACT_ADDRESS,
      );
      setContract(loadedContract);
    }
  }, [contract, enqueueSnackbar, web3Provider]);

  const getProductsSize = useCallback(async (): Promise<number | void> => {
    const result: number = await contract?.methods.size().call();
    setProductsSize(result);
  }, [contract]);

  const getProductByIndex = useCallback(
    async (index: number): Promise<IProduct | undefined> => {
      const result = await contract?.methods.products(index).call();
      const newProduct: IProduct = { ...result, id: index };
      return newProduct;
    },
    [contract],
  );

  const getAllProducts = async () => {
    const productPromises = [];
    for (let index = 0; index < productsSize; index += 1) {
      productPromises.push(getProductByIndex(index));
    }
    const results = await Promise.all(productPromises);
    setProducts(results);
  };

  const getPendingDelegations = useCallback(() => {
    if (address) {
      const delegations = products.filter(
        (product) =>
          product?.status.toString() === '1' &&
          product.newOwner.toLowerCase() === address?.toLowerCase(),
      );
      setPendingDelegations(delegations);
    }
  }, [products]);

  const createProduct = async (name: string) => {
    const result = await contract?.methods
      .createProduct(name)
      .send({ from: address });
    const receipt = result.events.NewProduct.returnValues;
    if (receipt) {
      enqueueSnackbar('Product created successfully', { variant: 'success' });
    }
  };

  const delegateProduct = async (productId: number, newOwner: string) => {
    const result = await contract?.methods
      .delegateProduct(productId, newOwner)
      .send({ from: address });
    const receipt = result.events.DelegateProduct.returnValues;
    if (receipt) {
      enqueueSnackbar('Product delegated successfully', { variant: 'success' });
    }
  };

  const acceptProduct = async (productId: number) => {
    const result = await contract?.methods
      .acceptProduct(productId)
      .send({ from: address });
    const receipt = result.events.AcceptProduct.returnValues;
    if (receipt) {
      enqueueSnackbar('Product accepted successfully', { variant: 'success' });
    }
  };

  useEffect(() => {
    if (contract) {
      getProductsSize();
    }
  }, [contract]);

  useEffect(() => {
    if (web3Provider) {
      loadContract();
    }
  }, [web3Provider]);

  return {
    getAllProducts,
    createProduct,
    delegateProduct,
    getPendingDelegations,
    acceptProduct,
  };
};

export default useProductFactory;
