// import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './UI/Home';
import Error from './UI/Error';
import Menu, {loader as menuLoader} from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, {loader as orderLoader} from './features/orders/Order';
import CreateOrder, {action as createOrderAction} from './features/orders/CreateOrder';
import AppLayout from "./UI/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        loader: menuLoader,
        path: '/menu',
        element: <Menu />,
        errorElement: <Error />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        loader: orderLoader,
        path: '/order/:orderId',
        element: <Order />,
        errorElement: <Error />,
      },
      {
        action: createOrderAction,
        path: '/order/new',
        element: <CreateOrder />
      }
    ] 
  }
])
const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default App