import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { useContext, createContext } from "react";
import { SocketProvider } from "./Context/SocketContext";
import Login from "./Components/Login/index.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GetStarted from "./Components/landingpage/GetStarted.jsx";
import SignUpForm from "./Components/Signup/index.jsx";
import RootLayout from "./RootLayout.jsx";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import JsDashboard from "./Components/Jobseeker/Dashboard/Dashboard.jsx";
import JobseekerRoutes from "./Components/Jobseeker/JobseekerRoutes.jsx";
import JsJobs from "./Components/Jobseeker/Jobs/jobs.jsx";
import JsProfile from "./Components/Jobseeker/Profile/Profile.jsx";
import AppliedJobs from "./Components/Jobseeker/Jobs/appliedJobs.jsx";
import ResumeUpload from "./Components/Jobseeker/Jobs/JobApplication/ResumeUpload.jsx";
import Job from "./Components/Jobseeker/Jobs/job.jsx";
import Loader from "./Components/Loader/Loader.jsx";

import MessageComponent from "./Components/Components/Message.jsx";

// Employer Routes
import EmployerRoute from "./Components/Employer/EmployerRoute.jsx";
import EmpDashboard from "./Components/Employer/Dashboard/Dashboard.jsx";
import JobListing from "./Components/Employer/Job/JobListing/jobListing.jsx";
import JobPost from "./Components/Employer/Job/JobPost/jobPost.jsx";
import CompaniesList from "./Components/Jobseeker/companies/companiesList.jsx";
import Company from "./Components/Jobseeker/companies/company.jsx";
import Analytics from "./Components/Jobseeker/Analytics/analytics.jsx";
import EmployerAnalytics from "./Components/Employer/Analytics/analytics.jsx";
import EmpCompany from "./Components/Employer/Company/Company.jsx";
import AdminRoutes from "./Components/Admin/AdminRoutes.jsx";
import AdminLoginPage from "./Components/Admin/AdminLogin.jsx";
import ApplyPage from "./Components/Jobseeker/Jobs/JobApplication/ApplyPage.jsx";
import ResumeBuilder from "./Components/Jobseeker/Resume/ResumeBuilder.jsx";
import JobDetails from "./Components/Employer/Job/JobDetails.jsx";
import EmpSkillAssessment from "./Components/Employer/SkillAssessments/SkillAssessment.jsx";
import EmpManageCompany from "./Components/Employer/Dashboard/ManageCompany.jsx";
import JsSkillAssessment from "./Components/Jobseeker/Jobs/JobApplication/SkillAssessment/SkillAssessment.jsx";
import ManageEmployees from "./Components/Employer/Dashboard/ManageEmployees.jsx";
import EmpCandidatesList from "./Components/Employer/Dashboard/ManageCandidates/CandidatesList.jsx";
import ManageCandidate from "./Components/Employer/Dashboard/ManageCandidates/ManageCandidate/Candidate.jsx";

import Candidates from "./Components/Employer/Job/JobListing/CanidateListings.jsx";
import ProfileForm from "./Components/Jobseeker/Profile/ProfileForm.jsx";
import EmpProfile from "./Components/Employer/Profile/Profile.jsx";
import EmpProfileForm from "./Components/Employer/Profile/ProfileForm.jsx";
import VideoInterview from "./Components/Jobseeker/Jobs/JobApplication/VideoInterview.jsx";
import CreateAssessmentForm from "./Components/Employer/SkillAssessments/CreateAssessment.jsx";
import AdminJobsList from "./Components/Admin/Job/JobsList.jsx";
import AdminCompaniesList from "./Components/Admin/ManageCompanies/CompaniesList.jsx";
import AdminDashboard from "./Components/Admin/Dashboard/Dashboard.jsx";

import { MantineProvider } from "@mantine/core";
import { NotFoundImage } from "./Components/NotFound/NotFoundImage.jsx";
import "@mantine/core/styles.css";
import AdminManageEmployees from "./Components/Admin/UsersManagement/ManageEmployees.jsx";
import AdminManageJobSeekers from "./Components/Admin/UsersManagement/ManageJobSeekers.jsx";
import ManageCompanies from "./Components/Admin/ManageCompanies/CompaniesList.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login/jobseeker",
        element: <Login role={"jobseeker"} />,
      },
      {
        path: "/signup/jobseeker",
        element: <SignUpForm />,
      },
      {
        path: "/login/employer",
        element: <Login role={"employer"} />,
      },
      {
        path: "/signup/employer",
        element: <SignUpForm />,
      },
      {
        path: "/login/admin",
        element: <AdminLoginPage />,
      },
      {
        path: "*", // Wildcard route for 404 errors
        element: <NotFoundImage />,
      },
    ],
  },
  {
    path: "/jobseeker",
    element: <JobseekerRoutes />,
    children: [
      {
        path: "dashboard",
        element: <JsDashboard />,
      },
      {
        path: "dashboard/analytics",
        element: <Analytics />,
      },
      {
        path: "profile",
        element: <JsProfile />,
      },
      {
        path: "profile/edit",
        element: <ProfileForm />,
      },
      {
        path: "jobs",
        element: <JsJobs />,
      },
      {
        path: "jobs/applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "job/:id",
        element: <Job />,
      },
      {
        path: "job/apply/:id",
        element: <ApplyPage />,
        children: [
          {
            path: "",
            element: <ResumeUpload />,
          },
          {
            path: "interview",
            element: <VideoInterview />,
          },
          {
            path: "skillAssessment",
            element: <JsSkillAssessment />,
          },
        ],
      },
      {
        path: "companies",
        element: <CompaniesList />,
      },
      {
        path: "companies/:id",
        element: <Company />,
      },
      {
        path: "cv-builder",
        element: <ResumeBuilder />,
      },
    ],
  },
  {
    path: "/employer",
    element: <EmployerRoute />,
    children: [
      {
        path: "profile",
        element: <EmpProfile />,
      },
      {
        path: "profile/edit",
        element: <EmpProfileForm />,
      },
      {
        path: "messages/",
        element: <MessageComponent />,
      },
      {
        path: "dashboard",
        element: <EmpDashboard />,
      },
      {
        path: "dashboard/analytics",
        element: <EmployerAnalytics />,
      },
      {
        path: "dashboard/employees/manage",
        element: <ManageEmployees />,
      },
      {
        path: "dashboard/company/manage",
        element: <EmpManageCompany />,
      },
      {
        path: "dashboard/candidates/manage",
        element: <EmpCandidatesList />,
      },
      {
        path: "dashboard/candidates/manage/:id",
        element: <ManageCandidate />,
      },
      {
        path: "company-profile",
        element: <EmpCompany />,
      },
      {
        path: "inbox",
        element: <h1>Messages</h1>,
      },
      {
        path: "job/job-listing",
        element: <JobListing />,
      },
      {
        path: "job/:id",
        element: <JobDetails />,
        children: [
          {
            path: "",
            element: <Candidates />,
          },
          {
            path: "jobdetails",
            element: <h1>Job details</h1>,
          },
          {
            path: "notes",
            element: <h1>Notes</h1>,
          },
          {
            path: "reports",
            element: <h1>Reports</h1>,
          },
        ],
      },
      {
        path: "job/job-post",
        element: <JobPost />,
      },
      {
        path: "skill/assessments",
        element: <EmpSkillAssessment />,
      },
      {
        path: "skill/assessments/create",
        element: <CreateAssessmentForm />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoutes />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "users/jobseekers",
        element: <AdminManageJobSeekers />,
      },
      {
        path: "users/employees",
        element: <AdminManageEmployees />,
      },
      {
        path: "job/listings",
        element: <AdminJobsList />,
      },
      {
        path: "companies",
        element: <ManageCompanies />,
      },
      {
        path: "analytics",
        element: <h1>Analytics</h1>,
      },
      {
        path: "*", // Wildcard route for 404 errors
        element: <NotFoundImage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <SocketProvider>
            <RouterProvider router={router} />
          </SocketProvider>
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
