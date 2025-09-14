import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import OurMenu from "../Pages/OurMenu/OurMenu/OurMenu.jsx";
import Order from "../Pages/Order/Order/Order.jsx";
import Login from "../Pages/Login/Login/Login.jsx";
import Register from "../Pages/Register/Register/Register.jsx";
import Register2 from "../Pages/Register/Register/Register2.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Secret from "../Pages/Secret/Secret.jsx";
import DeshBoardLayout from "../Layout/DeshBoardLayout.jsx";
import Cart from "../Pages/DashboardPage/Cart/Cart.jsx";
import AllUsers from "../Pages/DashboardPage/AllUsers/AllUsers.jsx";
import Additems from "../Pages/DashboardPage/AddItems/Additems.jsx";
import AdminRoute from './AdminRoute.jsx'
import ManageItems from "../Pages/DashboardPage/ManageItems/ManageItems.jsx";
import UpdateItem from "../Pages/DashboardPage/UpdateItem/UpdateItem.jsx";
import Payment from "../Pages/DashboardPage/Payment/Payment.jsx";
import PaymentHistory from "../Pages/DashboardPage/PaymentHistory/PaymentHistory.jsx";
import AdminHome from "../Pages/DashboardPage/AdminHome/AdminHome.jsx";
import UserHome from "../Pages/DashboardPage/UserHome/UserHome.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <OurMenu></OurMenu>
      },
      {
        path: "/order/:category",
        element: <Order></Order>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/register2",
        element: <Register2></Register2>
      },
      {
        path: "/secret",
        element: <PrivateRoute><Secret /></PrivateRoute>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DeshBoardLayout /></PrivateRoute>,
    children: [
      {
        path: "/dashboard/admin-home",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: "/dashboard/user-home",
        element: <UserHome></UserHome>
      },
      {
        path: "/dashboard/dashboard-cart",
        element: <Cart />
      },
      {
        path: "/dashboard/additems",
        element: <AdminRoute><Additems></Additems></AdminRoute>
      },
      {
        path: "/dashboard/allUsers",
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: "/dashboard/manage-items",
        element: <AdminRoute> <ManageItems></ManageItems> </AdminRoute>
      },
      {
        path: "/dashboard/update-item/:id",
        element: <AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/menus/${params.id}`),
      },
      {
        path: "/dashboard/pay",
        element: <Payment></Payment>
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  }
]);