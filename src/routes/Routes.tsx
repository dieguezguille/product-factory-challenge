import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import ContentLayout from '../components/layout/ContentLayout';
import { RoutesEnum } from '../enums/routes.enum';

const AppRoutes: RouteObject[] = [
  {
    path: RoutesEnum.BASE,
    element: <ContentLayout />,
    children: [
      {
        path: RoutesEnum.PRODUCTS,
        element: <div>Products</div>,
      },
    ],
  },
];

const Routes: React.FC = () => useRoutes(AppRoutes);

export default Routes;
