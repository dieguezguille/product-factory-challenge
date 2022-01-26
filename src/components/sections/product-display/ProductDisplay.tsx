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
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import IosShareIcon from '@mui/icons-material/IosShare';

import useProductFactory from '../../../hooks/product-factory.hook';

const ProductDisplay: React.FC = () => {
  const { products } = useProductFactory();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
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
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="center">{product.status}</TableCell>
              <TableCell align="right">{product.owner}</TableCell>
              <TableCell align="right">{product.newOwner}</TableCell>
              <TableCell align="center" padding="checkbox">
                <Tooltip title="Delegate">
                  <IconButton aria-label="delegate">
                    <IosShareIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductDisplay;
