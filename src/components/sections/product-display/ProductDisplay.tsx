/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Typography, Button } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import RefreshIcon from '@mui/icons-material/Refresh';

import DelegationDialog from '../../common/delegation-dialog/DelegationDialog';
import useProductFactory from '../../../hooks/product-factory.hook';
import { productFactoryContext } from '../../providers/ProductFactoryProvider';
import EmptyData from '../../common/empty-data/EmptyData';
import EnhancedTable from '../../common/enhanced-table/EnhancedTable';
import { appContext } from '../../providers/AppProvider';

const ProductDisplay: React.FC = () => {
  const { getAllProducts } = useProductFactory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const { products, contract } = useContext(productFactoryContext);
  const { isLoading } = useContext(appContext);

  const handleDialogOpen = (id: number) => {
    setSelectedProductId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRefresh = useCallback(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    if (contract) {
      getAllProducts();
    }
  }, [contract]);

  useEffect(() => {
    if (!isLoading) {
      handleDialogClose();
    }
  }, [isLoading]);

  return (
    <>
      <Typography
        textAlign="center"
        variant="h5"
        component="h2"
        sx={{ marginBottom: '25px' }}
      >
        All Products
      </Typography>

      <Button
        variant={'contained'}
        sx={{ marginBottom: '25px' }}
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
      >
        Refresh
      </Button>

      {products && products.length > 0 ? (
        <EnhancedTable
          initialPage={0}
          initialRowsPerPage={10}
          products={products}
          action={handleDialogOpen}
          actionIcon={<IosShareIcon />}
          actionTooltip="Delegate"
        />
      ) : (
        <EmptyData />
      )}

      <DelegationDialog
        isOpen={dialogOpen}
        productId={selectedProductId}
        handleClose={handleDialogClose}
      />
    </>
  );
};

export default ProductDisplay;
