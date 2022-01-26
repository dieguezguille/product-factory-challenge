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
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IosShareIcon from '@mui/icons-material/IosShare';

import useProductFactory from '../../../hooks/product-factory.hook';
import DelegationDialog from '../../common/delegation-dialog/DelegationDialog';

const ProductDisplay: React.FC = () => {
  const { products } = useProductFactory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);

  const handleDialogOpen = (id: number) => {
    setSelectedProductId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
            {products.map((product) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DelegationDialog
        isOpen={dialogOpen}
        productId={selectedProductId}
        handleClose={handleDialogClose}
      />
    </>
  );
};

export default ProductDisplay;
