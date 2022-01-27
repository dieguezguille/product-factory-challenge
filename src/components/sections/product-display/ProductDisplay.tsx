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
  styled,
  TablePagination,
} from '@mui/material';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import IosShareIcon from '@mui/icons-material/IosShare';
import RefreshIcon from '@mui/icons-material/Refresh';

import DelegationDialog from '../../common/delegation-dialog/DelegationDialog';
import useProductFactory from '../../../hooks/product-factory.hook';
import { productFactoryContext } from '../../providers/ProductFactoryProvider';
import EmptyData from '../../common/empty-data/EmptyData';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ProductDisplay: React.FC = () => {
  const { getAllProducts } = useProductFactory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { products, contract } = useContext(productFactoryContext);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) =>
                  product ? (
                    <StyledTableRow
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
                    </StyledTableRow>
                  ) : null,
                )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
