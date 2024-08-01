import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import jobPostSchema from "../../../../Schemas/Employer/jobPost.schema";
import { Formik, useFormik } from "formik";
import EmployerController from "../../../../API/employer";

const JobPost = () => {
  const [mesage, setMessage] = useState("");
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      title: "",
      description: "",
      requirements: "",
      company: "",
      location: "",
      salaryRange: "",
      employmentType: "",
    },
    validationSchema: jobPostSchema,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await EmployerController.postJob(values, token);
      if (response.status === 200) {
        setMessage("Job Posted Successfully");
        setTimeout(() => {
          setMessage("");
        },3000)
      } else {
        setMessage("Error Posting Job");
      }
    } catch (error) {
      console.log(error);
    }

    // You can handle form submission here
    // console.log(values);
  };

  return (
    <Container maxWidth="md">
      {mesage && (
        <Typography className="mx-auto fixed bottom-0 right-0 z-100 bg-gray-800 text-white p-10 rounded-lg" variant="h6" component="h6" align="center" gutterBottom>
          {mesage}
        </Typography>
      )}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Post a Job
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Job Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={errors.title && touched.title ? 1 : undefined}
              helperText={touched.title && errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Job Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={errors.description && touched.description ? 1 : undefined}
              helperText={touched.description && errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="requirements"
              name="requirements"
              label="Requirements"
              value={values.requirements}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={
                errors.requirements && touched.requirements ? 1 : undefined
              }
              helperText={touched.requirements && errors.requirements}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="company"
              name="company"
              label="Company"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={errors.company && touched.company ? 1 : undefined}
              helperText={touched.company && errors.company}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={errors.location && touched.location ? 1 : undefined}
              helperText={touched.location && errors.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="salaryRange"
              name="salaryRange"
              label="Salary Range"
              value={values.salaryRange}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={errors.salaryRange && touched.salaryRange ? 1 : undefined}
              helperText={touched.salaryRange && errors.salaryRange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="employmentType"
              name="employmentType"
              label="Employment Type"
              value={values.employmentType}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              error={
                errors.employmentType && touched.employmentType ? 1 : undefined
              }
              helperText={touched.employmentType && errors.employmentType}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !values.title ||
                !values.description ||
                !values.requirements ||
                !values.company ||
                !values.location ||
                !values.salaryRange ||
                !values.employmentType ||
                Object.keys(errors).length > 0
              }
            >
              Post Job
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default JobPost;
