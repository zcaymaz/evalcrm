/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const CustomerAdd = lazy(() => import('../pages/CustomerAdd/index'));
const CustomerDetail = lazy(() => import('../pages/CustomerDetail/index'));
const CustomerList = lazy(() => import('../pages/CustomerList/index'));
// const Login = lazy(() => import('../pages/Login/index'));

const routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <CustomerAdd />,
    },
    {
      path: '/about',
      element: <CustomerList />,
    },
    {
      path: '/people',
      element: <CustomerDetail />,
    },
  ],
};

export default routes;