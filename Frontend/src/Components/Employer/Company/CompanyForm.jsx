import React, { useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import employer from '../../../API/employer';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Company name is required'),
  description: yup.string().required('Description is required'),
  industry: yup.string().required('Industry is required'),
  website: yup.string().url('Enter a valid URL').required('Website is required'),
  logo: yup.string().url('Enter a valid URL'),
  address: yup.string().required('Address is required'),
  contactEmail: yup.string().email('Enter a valid email').required('Contact email is required'),
  contactPhone: yup.string().required('Contact phone is required'),
});

const CompanyForm = ({ setEdit, Edit, setCompany, company }) => {
    const updateCompany = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await employer.updateCompany(values, token);
            if (response.status === 200) {
                console.log('Company updated successfully');
            }
        } catch (error) {
            console.error('Error updating company', error);
        }
    }

    const registerCompany = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await employer.registerCompany(values, token);
            if (response.status === 200) {
                console.log('Company created successfully');
            }
        } catch (error) {
            console.error('Error creating company', error);
        }
    }
  const formik = useFormik({
    initialValues: {
      name: company?.name || '',
      description: company?.description || '',
      industry: company?.industry || '',
      website: company?.website || '',
      logo: company?.logo || '',
      address: company?.address || '',
      contactEmail: company?.contactEmail || '',
      contactPhone: company?.contactPhone || '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      // Perform create or update company logic here
      if (Edit) {
        // Update company
        console.log('Updating company...');
        // Update company logic
        setCompany(values);
        updateCompany(values);
        

      } else {
        // Create new company
        console.log('Creating new company...');
        // Create company logic
        setCompany(values);
        registerCompany(values);
      }
      setEdit(false);
    },
  });

  useEffect(() => {
    if (Edit && company) {
      formik.setValues(company);
    }
  }, [Edit, company]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-10">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8">
          <Typography variant="h4" component="h1" className="text-center font-bold mb-6">
            {Edit ? 'Edit Company' : 'Register a Company'}
          </Typography>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Company Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="industry"
                  name="industry"
                  label="Industry"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.industry && Boolean(formik.errors.industry)}
                  helperText={formik.touched.industry && formik.errors.industry}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="logo"
                  name="logo"
                  label="Logo URL"
                  value={formik.values.logo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.logo && Boolean(formik.errors.logo)}
                  helperText={formik.touched.logo && formik.errors.logo}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contactEmail"
                  name="contactEmail"
                  label="Contact Email"
                  value={formik.values.contactEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
                  helperText={formik.touched.contactEmail && formik.errors.contactEmail}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contactPhone"
                  name="contactPhone"
                  label="Contact Phone"
                  value={formik.values.contactPhone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactPhone && Boolean(formik.errors.contactPhone)}
                  helperText={formik.touched.contactPhone && formik.errors.contactPhone}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" fullWidth type="submit">
                  {Edit ? 'Update Company' : 'Register Company'}
                </Button>
              </Grid>
              {Edit && (
                <Grid item xs={12}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default CompanyForm;
