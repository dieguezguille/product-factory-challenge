/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';

import useProductFactory from '../../../hooks/product-factory.hook';
import { productFactoryContext } from '../../providers/ProductFactoryProvider';
import EmptyData from '../../common/empty-data/EmptyData';
import { walletProviderContext } from '../../providers/WalletProvider';
import Forbidden from '../../common/forbidden/Forbidden';

const PendingDelegations: React.FC = () => {
  const { getPendingDelegations, acceptProduct } = useProductFactory();
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
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right">New Owner</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingDelegations.map((product) =>
                product ? (
                  <TableRow
                    key={uuidv4()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{product.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="center">{product.status}</TableCell>
                    <TableCell align="right">{product.owner}</TableCell>
                    <TableCell align="right">{product.newOwner}</TableCell>
                    <TableCell align="center" padding="checkbox">
                      <Tooltip title="Accept">
                        <IconButton
                          aria-label="accept delegation"
                          onClick={() => handleAcceptProduct(product.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ) : null,
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyData />
      )}
    </>
  ) : (
    <Forbidden />
  );
};

export default PendingDelegations;
