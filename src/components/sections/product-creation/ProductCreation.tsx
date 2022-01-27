/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Stack, Typography, Grid, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

import useProductFactory from '../../../hooks/product-factory.hook';

const ProductCreation: React.FC = () => {
  const { createProduct } = useProductFactory();
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

  return (
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
  );
};

export default ProductCreation;
