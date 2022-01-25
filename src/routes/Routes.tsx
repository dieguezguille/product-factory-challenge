import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import PendingDelegations from '../components/sections/pending-delegations/PendingDelegations';
import ProductCreation from '../components/sections/product-creation/ProductCreation';
import ProductDelegation from '../components/sections/product-delegation/ProductDelegation';
import ProductDisplay from '../components/sections/product-display/ProductDisplay';
import { RoutesEnum } from '../enums/routes.enum';

const AppRoutes: RouteObject[] = [
  {
    path: RoutesEnum.BASE,
    element: <ContentLayout />,
    children: [
      { path: RoutesEnum.BASE, element: <Navigate to={RoutesEnum.PRODUCTS} /> },
      {
        path: RoutesEnum.PRODUCTS,
        element: <ProductDisplay />,
      },
      { path: RoutesEnum.CREATE_PRODUCT, element: <ProductCreation /> },
      { path: RoutesEnum.PENDING_DELEGATIONS, element: <PendingDelegations /> },
      { path: RoutesEnum.DELEGATE, element: <ProductDelegation /> },
      { path: RoutesEnum.ANY, element: <Navigate to={RoutesEnum.PRODUCTS} /> },
    ],
  },
];

const Routes: React.FC = () => useRoutes(AppRoutes);

export default Routes;
