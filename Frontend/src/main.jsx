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
import RootLayout from './RootLayout.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import Dashboard from './Components/Jobseeker/Dashboard/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <App/>,
        // loader: teamLoader,
      },,{
        path:"/login/jobseeker",
        element: <Login userType={"jobseeker"}/>
      },{
        path:"/signup/jobseeker",
        element: <SignUpForm/>
      },{
        path:"/login/employer",
        element: <Login userType={"employer"}/>
      },{
        path:"/signup/employer",
        element: <SignUpForm />
      },{
        path:"/Dashboard",
        element:<Dashboard/>
      }
    ],
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
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
