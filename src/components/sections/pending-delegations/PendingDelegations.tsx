/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Typography, Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';

import useProductFactory from '../../../hooks/product-factory.hook';
import { productFactoryContext } from '../../providers/ProductFactoryProvider';
import EmptyData from '../../common/empty-data/EmptyData';
import { walletProviderContext } from '../../providers/WalletProvider';
import Forbidden from '../../common/forbidden/Forbidden';
import EnhancedTable from '../../common/enhanced-table/EnhancedTable';
import { appContext } from '../../providers/AppProvider';

const PendingDelegations: React.FC = () => {
  const { getPendingDelegations, acceptProduct } = useProductFactory();
  const { shouldRefresh, setShouldRefresh } = useContext(appContext);
  const { contract, pendingDelegations } = useContext(productFactoryContext);
  const { connected } = useContext(walletProviderContext);

  const handleAcceptProduct = async (productId: number) => {
    await acceptProduct(productId);
  };

  useEffect(() => {
    if (contract && connected) {
      getPendingDelegations();
    }
  }, [contract, connected]);

  useEffect(() => {
    if (shouldRefresh) {
      getPendingDelegations();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  return connected ? (
    <>
      <Typography
        textAlign="center"
        variant="h5"
        component="h2"
        sx={{ marginBottom: '25px' }}
      >
        Pending Delegations
      </Typography>
      <Button
        variant={'contained'}
        sx={{ marginBottom: '25px' }}
        startIcon={<RefreshIcon />}
        onClick={getPendingDelegations}
      >
        Refresh
      </Button>
      {pendingDelegations && pendingDelegations.length > 0 ? (
        <EnhancedTable
          initialPage={0}
          initialRowsPerPage={10}
          products={pendingDelegations}
          action={handleAcceptProduct}
          actionIcon={<CheckIcon />}
          actionTooltip="Accept"
        />
      ) : (
        <EmptyData />
      )}
    </>
  ) : (
    <Forbidden />
  );
};

export default PendingDelegations;
