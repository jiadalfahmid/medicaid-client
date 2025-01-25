import { createBrowserRouter } from "react-router-dom";

import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from './../Pages/Register/Register';
import ErrorPage from './../Pages/ErrorPage.jsx/ErrorPage';
import Shop from './../Pages/Shop/Shop';
import Cart from "../Pages/Cart/Cart";
import PrivateRouter from './PrivateRouter';
import Dashboard from "../Pages/Dashboard/Dashboard";
import AdminRoute from './AdminRouter';
import AdminHome from "../Pages/AdminHome/AdminHome";
import AllUser from "../Pages/AllUser/AllUser";
import Categories from "../Pages/Categories/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <PrivateRouter>
          <Cart />
        </PrivateRouter>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRouter><Dashboard/></PrivateRouter>,
    children: [
      // admin only routes
      {
        path: 'admin-home',
        element: <AdminRoute><AdminHome/></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><AllUser/></AdminRoute>
      },
      {
        path: 'category',
        element: <AdminRoute><Categories/></AdminRoute>
      }
    ],
  },
]);

export default router;
