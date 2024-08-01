// src/pages/Company/Company.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import EmployerController from "../../../API/employer";
import Loader from '../../Loader/Loader';
import CompanyForm from './CompanyForm';

const Company = () => {
  const [company, setCompany] = useState(null);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
    const [loading, setLoding] = useState(true);


  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem('token');
      const company = await EmployerController.getCompany(token);

      if (company.status === 200) {
        console.log(company);
        setCompany(company.data.data);
        setLoding(false);
      } else if(company.status === 404){
        setCreate(true);
        setLoding(false);
      }else
        console.log(company.message);
    }
    fetchCompany();
  }, []);

 

  if (loading) {
    return <Loader />;
  }else if (create){
    return <CompanyForm setEdit={setEdit} Edit={false} setCompany={setCompany} />;
  }else if (edit){
    return <CompanyForm setEdit={setEdit} Edit={true} setCompany={setCompany} company={company} />;
  }
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <Container maxWidth="lg" className="mt-20">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className="rounded-lg shadow-lg overflow-hidden">
                {/* edit button */}
            <Button variant='contained' onClick={() => setEdit(true)} className="bg-blue-500 fixed right-0 text-white p-2 rounded-lg">Edit</Button>
              <CardMedia
                component="img"
                height="150"
                image={company.logo || 'https://source.unsplash.com/random'}
                alt={company.name}
                className="object-contain mx-auto"
                style={{ width: '150px', margin: '20px auto' }} // Centering and resizing the image
              />
              <CardContent className="p-6">
                <Typography variant="h4" component="div" className="font-bold mb-4">
                  {company.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" className="mb-4">
                  {company.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  <strong>Industry:</strong> {company.industry}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  <strong>Website:</strong> <a href={company.website} className="text-blue-500">{company.website}</a>
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  <strong>Address:</strong> {company.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  <strong>Email:</strong> <a href={`mailto:${company.contactEmail}`} className="text-blue-500">{company.contactEmail}</a>
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  <strong>Phone:</strong> {company.contactPhone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Company;
