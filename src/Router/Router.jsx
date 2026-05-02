import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MedLoader from "../Components/MedLoader/MedLoader";

import Root from "../Pages/Root/Root";
import ErrorPage from "./../Pages/ErrorPage.jsx/ErrorPage";
import AdminRoute from "./AdminRouter";
import PrivateRouter from "./PrivateRouter";
import SellerRoute from "./SellerRouter";
import Dashboard from "../Pages/Dashboard/Dashboard";

const AdminAdsManager = lazy(() => import("../Pages/AdminAdsManager/AdminAdsManager"));
const AdminHome = lazy(() => import("../Pages/AdminHome/AdminHome"));
const AllUser = lazy(() => import("../Pages/AllUser/AllUser"));
const Cart = lazy(() => import("../Pages/Cart/Cart"));
const Categories = lazy(() => import("../Pages/Categories/Categories"));
const Home = lazy(() => import("../Pages/Home/Home"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Register = lazy(() => import("./../Pages/Register/Register"));
const Shop = lazy(() => import("./../Pages/Shop/Shop"));
const SellerAdsManager = lazy(() => import("../Pages/SellerAdsManager/SellerAdsManager"));
const SellerHome = lazy(() => import("../Pages/SellerHome/SellerHome"));
const SellerMedicinePage = lazy(() => import("../Pages/SellerMedicinePage/SellerMedicinePage"));
const CheckoutPage = lazy(() => import("../Pages/CheckoutPage/CheckoutPage"));
const PaymentHistory = lazy(() => import("./../Pages/PaymentHistory/PaymentHistory"));
const InvoicePage = lazy(() => import("../Pages/InvoicePage/InvoicePage"));
const ProfilePage = lazy(() => import("../Pages/Profile/Profile"));
const PaymentManagement = lazy(() => import("../Pages/PaymentManagement/PaymentManagement"));
const SalesReport = lazy(() => import("../Pages/SalesReport/SalesReport"));
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("../Pages/ContactUs/ContactUs"));
const PrivacyPolicy = lazy(() => import("../Pages/Legal/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../Pages/Legal/RefundPolicy"));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<MedLoader />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SuspenseWrapper><Home /></SuspenseWrapper>,
      },
      {
        path: "/shop",
        element: <SuspenseWrapper><Shop /></SuspenseWrapper>,
      },
      {
        path: "/about",
        element: <SuspenseWrapper><AboutUs /></SuspenseWrapper>,
      },
      {
        path: "/contact",
        element: <SuspenseWrapper><ContactUs /></SuspenseWrapper>,
      },
      {
        path: "/profile",
        element: <SuspenseWrapper><ProfilePage /></SuspenseWrapper>,
      },
      {
        path: "/privacy-policy",
        element: <SuspenseWrapper><PrivacyPolicy /></SuspenseWrapper>,
      },
      {
        path: "/refund-policy",
        element: <SuspenseWrapper><RefundPolicy /></SuspenseWrapper>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRouter>
            <SuspenseWrapper><Cart /></SuspenseWrapper>
          </PrivateRouter>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRouter>
            <SuspenseWrapper><CheckoutPage /></SuspenseWrapper>
          </PrivateRouter>
        ),
      },
      {
        path: "/invoice",
        element: (
          <PrivateRouter>
            <SuspenseWrapper><InvoicePage /></SuspenseWrapper>
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: <SuspenseWrapper><Login /></SuspenseWrapper>,
      },
      {
        path: "/register",
        element: <SuspenseWrapper><Register /></SuspenseWrapper>,
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
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <SuspenseWrapper><AdminHome /></SuspenseWrapper>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <SuspenseWrapper><AllUser /></SuspenseWrapper>
          </AdminRoute>
        ),
      },
      {
        path: "category",
        element: (
          <AdminRoute>
            <SuspenseWrapper><Categories /></SuspenseWrapper>
          </AdminRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <AdminRoute>
            <SuspenseWrapper><PaymentManagement /></SuspenseWrapper>
          </AdminRoute>
        ),
      },
      {
        path: "report",
        element: (
          <AdminRoute>
            <SuspenseWrapper><SalesReport /></SuspenseWrapper>
          </AdminRoute>
        ),
      },
      {
        path: "ads-manager",
        element: (
          <AdminRoute>
            <SuspenseWrapper><AdminAdsManager /></SuspenseWrapper>
          </AdminRoute>
        ),
      },
      {
        path: "seller-home",
        element: (
          <SellerRoute>
            <SuspenseWrapper><SellerHome /></SuspenseWrapper>
          </SellerRoute>
        ),
      },
      {
        path: "medicines",
        element: (
          <SellerRoute>
            <SuspenseWrapper><SellerMedicinePage /></SuspenseWrapper>
          </SellerRoute>
        ),
      },
      {
        path: "add-ads",
        element: (
          <SellerRoute>
            <SuspenseWrapper><SellerAdsManager /></SuspenseWrapper>
          </SellerRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRouter>
            <SuspenseWrapper><PaymentHistory /></SuspenseWrapper>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
