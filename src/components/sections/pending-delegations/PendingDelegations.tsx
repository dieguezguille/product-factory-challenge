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
} from '@mui/material';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '@mui/icons-material/Check';

import useProductFactory from '../../../hooks/product-factory.hook';

const PendingDelegations: React.FC = () => {
  const { products, pendingDelegations, getPendingDelegations, acceptProduct } =
    useProductFactory();

  const handleClick = async (productId: number) => {
    await acceptProduct(productId);
  };

  useEffect(() => {
    getPendingDelegations();
  }, [products, getPendingDelegations]);

  return (
    <>
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
            {pendingDelegations.map((product) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PendingDelegations;
