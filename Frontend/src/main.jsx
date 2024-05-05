import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Components/landingpage/Login.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import GetStarted from './Components/landingpage/GetStarted.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    children: [
      // {
      //   path: "getstarted",
      //   element: <GetStarted/>,
      //   // loader: teamLoader,
      // },
    ],
  },{
    path:"/login",
    element: <Login/>
  },
  // {
  //   path: "getstarted",
  //   element: <GetStarted/>,
  //   // loader: teamLoader,
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
