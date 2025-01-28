import { createBrowserRouter } from "react-router-dom";

import AdminAdsManager from "../Pages/AdminAdsManager/AdminAdsManager";
import AdminHome from "../Pages/AdminHome/AdminHome";
import AllUser from "../Pages/AllUser/AllUser";
import Cart from "../Pages/Cart/Cart";
import Categories from "../Pages/Categories/Categories";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Root from "../Pages/Root/Root";
import ErrorPage from "./../Pages/ErrorPage.jsx/ErrorPage";
import Register from "./../Pages/Register/Register";
import Shop from "./../Pages/Shop/Shop";
import AdminRoute from "./AdminRouter";
import PrivateRouter from "./PrivateRouter";
import SellerRoute from "./SellerRouter";
import SellerAdsManager from "../Pages/SellerAdsManager/SellerAdsManager";
import SellerHome from "../Pages/SellerHome/SellerHome";
import SellerMedicinePage from "../Pages/SellerMedicinePage/SellerMedicinePage";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";

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
        element: (
          <PrivateRouter>
            <Cart />
          </PrivateRouter>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRouter>
            <CheckoutPage />
          </PrivateRouter>
        ),
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
    path: "dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      // admin only routes
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "category",
        element: (
          <AdminRoute>
            <Categories />
          </AdminRoute>
        ),
      },
      {
        path: "ads-manager",
        element: (
          <AdminRoute>
            <AdminAdsManager />
          </AdminRoute>
        ),
      },
      // Seller only routes
      {
        path: "seller-home",
        element: (
          <SellerRoute>
            <SellerHome />
          </SellerRoute>
        ),
      },
      {
        path: "medicines",
        element: (
          <SellerRoute>
            <SellerMedicinePage />
          </SellerRoute>
        ),
      },
      {
        path: "add-ads",
        element: (
          <SellerRoute>
            <SellerAdsManager />
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default router;
