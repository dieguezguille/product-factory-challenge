import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
  styled,
} from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '../../../interfaces/product.interface';

type EnhancedTableProps = {
  initialPage: number;
  initialRowsPerPage: number;
  products: Array<IProduct | undefined>;
  action: (productId: number) => void;
  actionIcon: React.ReactNode;
  actionTooltip: string;
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EnhancedTable: React.FC<EnhancedTableProps> = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.products.length)
      : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
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
          {props.products
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
                    <Tooltip title={props.actionTooltip}>
                      <IconButton onClick={() => props.action(product.id)}>
                        {props.actionIcon}
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
        count={props.products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EnhancedTable;
