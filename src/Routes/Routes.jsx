// import { createBrowserRouter } from "react-router";
// import Mainlayout from "../Layouts/Mainlayout";
// import Home from "../Pages/Home/Home";
// import Register from "../Components/Register";
// import { LogIn } from "lucide-react";
// import Login from "../Components/Login";
// import AddTransaction from "../Pages/AddTransaction";
// import Mytransaction from "../Pages/Mytransaction";
// import ViewDetails from "../Pages/ViewDetails";


// export const router=createBrowserRouter([
//     {
//         path:'/', element:<Mainlayout/>,
//         children:[
//             {path:'/', element:<Home/>},
//             {path:'/register', element:<Register/>},
//             {path:'/login', element:<Login/>},
//             {path:'/add-transaction', element:<AddTransaction/>},
//             {path:'/my-transaction', element:<Mytransaction/>},
//             // {path:'/transactions/:id',
//             //     loader:({params})=>fetch(`http://localhost:3000/transactions/${params.id}`),
//             //     element:<ViewDetails/>
//             // }
//         ]
//     }
// ])







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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', 
        
          loader: () =>
          fetch("http://localhost:3000/add-transaction"),
        element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/add-transaction', element:<PrivaterRoute><AddTransaction/></PrivaterRoute> },
      { path: '/my-transaction', 
         loader: ({ params }) =>
          fetch(`http://localhost:3000/transactions/${params.id}`),
        element:<PrivaterRoute> <Mytransaction /></PrivaterRoute> },
      {
        path: '/transactions/:id',
        loader: ({ params }) =>
          fetch(`http://localhost:3000/transactions/${params.id}`),
        element:<PrivaterRoute> <ViewDetails /></PrivaterRoute>,

      },
      {path:'/report', element:<PrivaterRoute><Report/></PrivaterRoute>}
     
    ],
  },
]);
