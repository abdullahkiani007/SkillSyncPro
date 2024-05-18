import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import jobPostSchema from '../../../../Schemas/Employer/jobPost.schema';
import { Formik, useFormik } from "formik";


const JobPost = () => {

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      title: '',
      description: '',
      requirements: '',
      company: '',
      location: '',
      salaryRange: '',
      employmentType: '',
    },
    validationSchema: jobPostSchema,
  });

  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    // You can handle form submission here
    // console.log(values);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Post a Job
      </Typography>
      <form onSubmit={handleSubmit}>
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
              error={errors.requirements && touched.requirements ? 1 : undefined}
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
              error={errors.employmentType && touched.employmentType ? 1 : undefined}
              helperText={touched.employmentType && errors.employmentType}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
