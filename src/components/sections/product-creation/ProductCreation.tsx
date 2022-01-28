/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Stack, Typography, Grid, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useProductFactory from '../../../hooks/product-factory.hook';
import { walletProviderContext } from '../../providers/WalletProvider';
import Forbidden from '../../common/forbidden/Forbidden';
import { RoutesEnum } from '../../../enums/routes.enum';
import { appContext } from '../../providers/AppProvider';

const ProductCreation: React.FC = () => {
  const { createProduct } = useProductFactory();
  const navigate = useNavigate();
  const { connected } = useContext(walletProviderContext);
  const { shouldRefresh, setShouldRefresh } = useContext(appContext);
  const handleSubmit = async (values: { name: string }) => {
    await createProduct(values.name);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .min(3, 'Must be 3 characters or more')
        .required('Product name is required'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (shouldRefresh) {
      navigate(RoutesEnum.PRODUCTS);
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  return connected ? (
    <Stack spacing={2}>
      <Typography textAlign="center" variant="h5" component="h2">
        Add Product
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} lg={5} justifyContent="center">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Name"
                type="string"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Add
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <Forbidden />
  );
};

export default ProductCreation;
