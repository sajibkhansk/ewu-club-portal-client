import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "../Pages/Login"
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";

import {
  createBrowserRouter,
} from "react-router-dom";
import SingleCLub from "../Pages/SingleCLub";

import Dashboard from "../Layout/Dashboard/Dashboard";
import MyApply from "../Layout/Dashboard/MyApply";
import ApplyNow from "../Pages/ApplyNow";
import PrivateRoute from "./PrivateRoute";
import AllApply from "../Layout/Dashboard/AllApply";
import AddClub from "../Layout/Dashboard/AddClub";
import MyProfile from "../Layout/Dashboard/MyProfile";




export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>
        },
        {
            path: "/clubs/:id",
            element: <SingleCLub></SingleCLub>,
            loader: ({ params }) => fetch(`http://localhost:3000/clubs/${params.id}`)
        },
        {
          path: "/applynow",
          element: <PrivateRoute><ApplyNow></ApplyNow></PrivateRoute>
        }
      ]
      
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path:'myapply',
          element:<MyApply></MyApply>
        },
        {
          path:'allapply',
          element:<AllApply></AllApply>
        },
        {
          path:'addclub',
          element:<AddClub></AddClub> 
        },
        {
            path:'Profile',
            element:<MyProfile></MyProfile>
          
        }
      ]
    }
  ]);