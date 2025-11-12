
import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import AddTransaction from "../Pages/AddTransaction";
import Mytransaction from "../Pages/Mytransaction";
import ViewDetails from "../Pages/ViewDetails";
import Overview from "../Pages/Home/Overview";
import Report from "../Pages/Report";
import PrivaterRoute from "../Privateroute/PrivaterRoute";
import NotFound from "../Components/NotFound";
import Profile from "../Components/Profile";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', 
        
          // loader: () =>
          // fetch("https://fin-ease-api-server-9lq391k9f-fahim-ajhars-projects.vercel.app/add-transaction"),
        element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/add-transaction', element:<PrivaterRoute><AddTransaction/></PrivaterRoute> },
      { path: '/my-transaction', 
        //  loader: ({ params }) =>
        //   fetch(`https://fin-ease-api-server-9lq391k9f-fahim-ajhars-projects.vercel.app/transactions/${params.id}`),
        element:<PrivaterRoute> <Mytransaction /></PrivaterRoute> },
      {
        path: '/transactions/:id',
        loader: ({ params }) =>
          fetch(`https://fin-ease-api-server-9lq391k9f-fahim-ajhars-projects.vercel.app/transactions/${params.id}`),
        element:<PrivaterRoute> <ViewDetails /></PrivaterRoute>,

      },
      {path:'/report', element:<PrivaterRoute><Report/></PrivaterRoute>},
      {path:'*', element:<NotFound/>},
      {path:'/profile', element:<Profile/>}
     
    ],
  },
]);
