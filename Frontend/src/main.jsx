import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Components/Login/index.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import GetStarted from './Components/landingpage/GetStarted.jsx'
import SignUpForm from './Components/Signup/index.jsx'

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
    path:"/login/jobseeker",
    element: <Login/>
  },{
    path:"/signup/jobseeker",
    element: <SignUpForm/>
  },{
    path:"/login/recruiter",
    element: <Login/>
  },{
    path:"/signup/recruiter",
    element: <SignUpForm/>
  }
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
