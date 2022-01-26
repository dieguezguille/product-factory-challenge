import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Stack } from '@mui/material';

import useProductFactory from '../../../hooks/product-factory.hook';

type DelegationDialogProps = {
  productId: number;
  isOpen: boolean;
  handleClose: () => void;
};

type DelegationValues = {
  productId: number;
  newOwner: string;
};

const DelegationDialog: React.FC<DelegationDialogProps> = (props) => {
  const { productId, isOpen, handleClose } = props;
  const { delegateProduct } = useProductFactory();

  const handleDelegate = async (values: DelegationValues) => {
    await delegateProduct(values.productId, values.newOwner);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productId,
      newOwner: '',
    },
    validationSchema: Yup.object({
      productId: Yup.number()
        .min(0, 'Product ID must be a positive number')
        .required('Product ID is required'),
      newOwner: Yup.string()
        .min(42, 'New owner address is not of valid length')
        .max(42, 'New owner address is not of valid length')
        .required('New owner is required'),
    }),
    onSubmit: handleDelegate,
  });

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Delegate Product</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText sx={{ marginBottom: '10px' }}>
                Fill all the required fields below in order to delegate a
                product to a new owner:
              </DialogContentText>
              <TextField
                id="productId"
                label="Product ID"
                type="number"
                value={formik.values.productId}
                onChange={formik.handleChange}
                error={
                  formik.touched.productId && Boolean(formik.errors.productId)
                }
                helperText={formik.touched.productId && formik.errors.productId}
              />
              <TextField
                id="newOwner"
                label="New Owner"
                type="string"
                value={formik.values.newOwner}
                onChange={formik.handleChange}
                error={
                  formik.touched.newOwner && Boolean(formik.errors.newOwner)
                }
                helperText={formik.touched.newOwner && formik.errors.newOwner}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              Delegate
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default DelegationDialog;
