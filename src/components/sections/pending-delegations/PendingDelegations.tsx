/* eslint-disable react-hooks/exhaustive-deps */
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

import useProductFactory from '../../../hooks/product-factory.hook';
import { productFactoryContext } from '../../providers/ProductFactoryProvider';

const PendingDelegations: React.FC = () => {
  const { getAllProducts, getPendingDelegations, acceptProduct } =
    useProductFactory();
  const { products, pendingDelegations } = useContext(productFactoryContext);

  const handleClick = async (productId: number) => {
    await acceptProduct(productId);
  };

  const handleLoad = async () => {
    await getAllProducts();
  };

  useEffect(() => {
    if (products) {
      getPendingDelegations();
    }
  }, [products]);

  return (
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
        onClick={handleLoad}
      >
        Refresh
      </Button>

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
            {pendingDelegations ? (
              pendingDelegations.map((product) =>
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
                          onClick={() => handleClick(product.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ) : null,
              )
            ) : (
              <TableRow
                key={uuidv4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">No pending delegations</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PendingDelegations;
