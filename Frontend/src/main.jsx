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
import EmployerAnalytics from './Components/Employer/Analytics/analytics.jsx'
import EmpCompany from './Components/Employer/Company/Company.jsx'
import AdminRoutes from './Components/Admin/AdminRoutes.jsx'
import AdminLoginPage from './Components/Admin/AdminLogin.jsx'
import ApplyPage from './Components/Jobseeker/Jobs/JobApplication/ApplyPage.jsx'

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
      },{
        path:"/login/admin",
        element:<AdminLoginPage/>
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
      },
      {
        path:"job/apply/:id",
        element:<ApplyPage/>
      }
      ,
      {
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
        path:"dashboard/analytics",
        element:<EmployerAnalytics/>
      },
      {
        path:"company-profile",
        element:<EmpCompany/>
      }
      ,{
        path:"inbox",
        element:<h1>Messages</h1>
      },{
        path:"job/job-listing",
        element:<JobListing/>
      },{
        path:"job/job-post",
        element:<JobPost/>
      },{
        path:"job/:id",
        element:<h1>Heyyy</h1>
      }

    ]
  },{
    path:"/admin",
    element:<AdminRoutes/>,
    children:[
      {
        path:"dashboard",
        element:<h1>Dashboard</h1>
      },{
        path:"jobseekers",
        element:<h1>Jobseekers</h1>
      },{
        path:"employers",
        element:<h1>Employers</h1>
      },{
        path:"jobs",
        element:<h1>Jobs</h1>
      },{
        path:"companies",
        element:<h1>Companies</h1>
      },{
        path:"analytics",
        element:<h1>Analytics</h1>
      }
    ]
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)




