import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import Products from '../components/pages/products/Products';
import { RoutesEnum } from '../enums/routes.enum';

const AppRoutes = (): RouteObject[] => [
  {
    path: RoutesEnum.BASE,
    element: <ContentLayout />,
    children: [
      { path: RoutesEnum.BASE, element: <Products /> },
      { path: RoutesEnum.CREATE_PRODUCT, element: <Products /> },
      { path: RoutesEnum.PENDING_DELEGATIONS, element: <Products /> },
      { path: RoutesEnum.PRODUCTS, element: <Products /> },
      { path: RoutesEnum.ANY, element: <Navigate to={RoutesEnum.BASE} /> },
    ],
  },
];

const Routes: React.FC = () => useRoutes(AppRoutes());

export default Routes;
