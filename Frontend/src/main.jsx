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
import {store,persistor} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import JsDashboard from './Components/Jobseeker/Dashboard/Dashboard.jsx'
import JobseekerRoutes from './Components/Jobseeker/JobseekerRoutes.jsx'
import JsJobs from './Components/Jobseeker/Jobs/jobs.jsx'
import JsProfile from './Components/Jobseeker/Profile/Profile.jsx'
import AppliedJobs from './Components/Jobseeker/Jobs/appliedJobs.jsx'
import Job from './Components/Jobseeker/Jobs/job.jsx'
import Loader from './Components/Loader/Loader.jsx'

// Employer Routes
import EmployerRoute from './Components/Employer/EmployerRoute.jsx'
import EmpDashboard from './Components/Employer/Dashboard/Dashboard.jsx'
import JobListing from './Components/Employer/Job/JobListing/jobListing.jsx'
import JobPost from './Components/Employer/Job/JobPost/jobPost.jsx'
import CompaniesList from './Components/Jobseeker/companies/companiesList.jsx'
import Company from './Components/Jobseeker/companies/company.jsx'
import Analytics from './Components/Jobseeker/Analytics/analytics.jsx'

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
        element: <Login role={"jobseeker"}/>
      },{
        path:"/signup/jobseeker",
        element: <SignUpForm/>
      },{
        path:"/login/employer",
        element: <Login role={"employer"}/>
      },{
        path:"/signup/employer",
        element: <SignUpForm />
      }
    ],
  },{
    path:"/jobseeker",
    element: <JobseekerRoutes/>,
    children:[
      {
        path:"dashboard",
        element: <JsDashboard/>
      },
      {
        path:"dashboard/analytics",
        element:<Analytics/>
      }
      ,
      {
        path:"profile",
        element:<JsProfile/>
      },
      {
        path:"Jobs",
        element:<JsJobs/>
      },{
        path:"jobs/applied-jobs",
        element:<AppliedJobs/>
      },{
        path:"job/:id",
        element:<Job/>
      },{
        path:"companies",
        element:<CompaniesList/>
      },{
        path:"companies/:name",
        element:<Company/>
      }
    ]
  },{
    path:"/employer",
    element: <EmployerRoute/>,
    children:[
      {
        path:"dashboard",
        element:<EmpDashboard/>
      },{
        path:"inbox",
        element:<h1>Messages</h1>
      },{
        path:"job/job-listing",
        element:<JobListing/>
      },{
        path:"job/job-post",
        element:<JobPost/>
      }

    ]
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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)




