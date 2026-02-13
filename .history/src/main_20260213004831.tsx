import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Root from './pages/Root/Root';
import Products from './pages/Products';
import Edit from './pages/Edit';
import Add from './pages/Add';
import ProductInfo from './pages/ProductInfo';
import ApiCrud from './pages/ApiCrud';

const routes=createBrowserRouter([
  {
    path:"/",
    element:<Auth/>,
    children:[
      {
        path:"",
        element:<SignIn/>
      },
      {
        path:"signup",
        element:<SignUp/>
      }
    ]
  },
  {
    path:"/dashboard",
    element:<Root/>,
    children:[
      {
        path:"",
        element:<Products/>,
        loader:async()=>{
          const response=await fetch("https://dashboard-i552.onrender.com/api/items",{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
          })
          if (response.ok) {
            return await response.json()
          }
        }
      },
      {
        path:"api",
        element:<ApiCrud/>,
        children:[
          {
            path:"edit/:id",
            element: <Edit/>
          },
          {
            path:"add/",
            element: <Add/>
          },
          {
            path: "info/:id",
            element: <ProductInfo/> 
          }
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
