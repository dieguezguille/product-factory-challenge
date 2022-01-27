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
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IosShareIcon from '@mui/icons-material/IosShare';

import DelegationDialog from '../../common/delegation-dialog/DelegationDialog';
import useProductFactory from '../../../hooks/product-factory.hook';
import { productFactoryContext } from '../../providers/ProductFactoryProvider';
import EmptyData from '../../common/empty-data/EmptyData';

const ProductDisplay: React.FC = () => {
  const { getAllProducts } = useProductFactory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const { products, contract } = useContext(productFactoryContext);

  const handleDialogOpen = (id: number) => {
    setSelectedProductId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRefresh = () => {
    getAllProducts();
  };

  useEffect(() => {
    if (contract) {
      getAllProducts();
    }
  }, [contract]);

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
        onClick={handleRefresh}
      >
        Refresh
      </Button>

      {products && products.length > 0 ? (
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
              {products.map((product) =>
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
                      <Tooltip title="Delegate">
                        <IconButton
                          aria-label="delegate"
                          onClick={() => handleDialogOpen(product.id)}
                        >
                          <IosShareIcon />
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

      <DelegationDialog
        isOpen={dialogOpen}
        productId={selectedProductId}
        handleClose={handleDialogClose}
      />
    </>
  );
};

export default ProductDisplay;
