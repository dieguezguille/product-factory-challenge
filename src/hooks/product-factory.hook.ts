/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useContext, useEffect } from 'react';
import { AbiItem } from 'web3-utils';
import { useSnackbar } from 'notistack';

import ProductFactoryAbi from '../abis/ProductFactory.json';
import { IProduct } from '../interfaces/product.interface';
import { productFactoryContext } from '../components/providers/ProductFactoryProvider';
import { walletProviderContext } from '../components/providers/WalletProvider';
import { appContext } from '../components/providers/AppProvider';

import useMetamaskUtils from './metamask-utils.hook';

export type ProductFactoryHookReturnType = {
  getAllProducts: () => Promise<Array<IProduct | undefined> | undefined>;
  createProduct: (name: string) => Promise<void>;
  delegateProduct: (productId: number, newOwner: string) => Promise<void>;
  getPendingDelegations: () => Promise<void>;
  acceptProduct: (productId: number) => Promise<void>;
};

const useProductFactory = (): ProductFactoryHookReturnType => {
  const { isMetamaskError } = useMetamaskUtils();
  const { enqueueSnackbar } = useSnackbar();
  const { setIsLoading, setShouldRefresh } = useContext(appContext);
  const { web3Provider, address, connected } = useContext(
    walletProviderContext,
  );
  const {
    contract,
    setContract,
    setProducts,
    setProductsSize,
    setPendingDelegations,
  } = useContext(productFactoryContext);

  const loadContract = () => {
    if (web3Provider && !contract) {
      const loadedContract = new web3Provider.eth.Contract(
        ProductFactoryAbi as AbiItem[],
        process.env.REACT_APP_CONTRACT_ADDRESS,
      );
      setContract(loadedContract);
    }
  };

  const getProductsSize = async (): Promise<number | void> => {
    const result: number = await contract?.methods.size().call();
    setProductsSize(result);
    return result;
  };

  const getProductByIndex = async (
    index: number,
  ): Promise<IProduct | undefined> => {
    if (!contract) {
      enqueueSnackbar('ProductFactory contract not found', {
        variant: 'error',
      });
      return undefined;
    }
    const result = await contract?.methods.products(index).call();
    const newProduct: IProduct = { ...result, id: index };
    return newProduct;
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const size = await getProductsSize();
      const productPromises = [];
      for (let index = 0; index < size; index += 1) {
        productPromises.push(getProductByIndex(index));
      }
      const results: Array<IProduct | undefined> = await Promise.all(
        productPromises,
      );
      setProducts(results);
      return results;
    } catch (error) {
      if (isMetamaskError(error) && error.code === 4001) {
        enqueueSnackbar('Transaction rejected', { variant: 'error' });
      } else {
        enqueueSnackbar('Operation failed', { variant: 'error' });
      }
      console.log('Get All Products Error: ', error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const getPendingDelegations = async () => {
    setIsLoading(true);
    try {
      const latestProducts = await getAllProducts();
      if (!latestProducts) {
        throw new Error('Failed to get all products');
      }
      const delegations = latestProducts.filter(
        (product) =>
          product?.status.toString() === '1' &&
          product.newOwner.toLowerCase() === address?.toLowerCase(),
      );
      setPendingDelegations(delegations);
    } catch (error) {
      if (isMetamaskError(error) && error.code === 4001) {
        enqueueSnackbar('Transaction rejected', { variant: 'error' });
      } else {
        enqueueSnackbar('Operation failed', { variant: 'error' });
      }
      console.log('Pending Delegations Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (name: string) => {
    setIsLoading(true);
    try {
      if (connected) {
        const result = await contract?.methods
          .createProduct(name)
          .send({ from: address });
        const receipt = result.events.NewProduct.returnValues;
        if (receipt) {
          setShouldRefresh(true);
          enqueueSnackbar('Product created successfully', {
            variant: 'success',
          });
        }
      } else {
        enqueueSnackbar('Connect wallet to continue', { variant: 'error' });
      }
    } catch (error) {
      if (isMetamaskError(error) && error.code === 4001) {
        enqueueSnackbar('Transaction rejected', { variant: 'error' });
      } else {
        enqueueSnackbar('Operation failed', { variant: 'error' });
      }
      console.log('Create Product Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const delegateProduct = async (productId: number, newOwner: string) => {
    setIsLoading(true);
    try {
      if (connected) {
        const result = await contract?.methods
          .delegateProduct(productId, newOwner)
          .send({ from: address });
        const receipt = result.events.DelegateProduct.returnValues;
        if (receipt) {
          setShouldRefresh(true);
          enqueueSnackbar('Product delegated successfully', {
            variant: 'success',
          });
        }
      } else {
        enqueueSnackbar('Connect wallet to continue', { variant: 'error' });
      }
    } catch (error) {
      if (isMetamaskError(error) && error.code === 4001) {
        enqueueSnackbar('Transaction rejected', { variant: 'error' });
      } else {
        enqueueSnackbar('Operation failed', { variant: 'error' });
      }
      console.log('Delegate Product Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptProduct = async (productId: number) => {
    setIsLoading(true);
    try {
      if (connected) {
        const result = await contract?.methods
          .acceptProduct(productId)
          .send({ from: address });
        const receipt = result.events.AcceptProduct.returnValues;
        if (receipt) {
          setShouldRefresh(true);
          enqueueSnackbar('Product accepted successfully', {
            variant: 'success',
          });
        }
      } else {
        enqueueSnackbar('Connect wallet to continue', { variant: 'error' });
      }
    } catch (error) {
      if (isMetamaskError(error) && error.code === 4001) {
        enqueueSnackbar('Transaction rejected', { variant: 'error' });
      } else {
        enqueueSnackbar('Operation failed', { variant: 'error' });
      }
      console.log('Delegate Product Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

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
