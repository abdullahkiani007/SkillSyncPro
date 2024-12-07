// userRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../../Controllers/AuthController");
const passport = require("passport");
const userController = require("../../Controllers/UserController");
const jobseekerController = require("../../Controllers/JobseekerController");
const JobsController = require("../../Controllers/JobsController");
const CompanyController = require("../../Controllers/CompanyController");

require("../../Config/passport")(passport);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are authenticated");
  }
);

// Get Applications
router.get(
  "/applications",
  passport.authenticate("jwt", { session: false }),
  JobsController.getApplications
);

// Get applied Jobs
router.get(
  "/jobs/applied",
  passport.authenticate("jwt", { session: false }),
  JobsController.getAppliedJobs
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getInfo
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.updateInfo
);
router.post(
  "/job/apply",
  passport.authenticate("jwt", {
    session: false,
  }),
  jobseekerController.applyJob
);

router.post(
  "/submitFeedback",
  passport.authenticate("jwt", {
    session: false,
  }),
  jobseekerController.submitFeedback
);

router.get("/companies", CompanyController.getCompanies);
router.get("/assessment", jobseekerController.getAssessmentByJobId);
router.post(
  "/startApplication",
  passport.authenticate("jwt", { session: false }),
  jobseekerController.startJobApplication
);
router.post(
  "/submitApplication",
  passport.authenticate("jwt", { session: false }),
  jobseekerController.submitJobApplication
);

module.exports = router;
