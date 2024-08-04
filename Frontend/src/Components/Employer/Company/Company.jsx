// src/pages/Company/Company.js

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import EmployerController from "../../../API/employer";
import Loader from "../../Loader/Loader";
import CompanyForm from "./CompanyForm";
import companyBackgroundImg from "../../../assets/company_background.jpg";
import logo from "../../../assets/companyLogo.png";
import personImage from "../../../assets/person.jpeg";
const Company = () => {
  const [company, setCompany] = useState(null);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [loading, setLoding] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [jobs, setJobs] = useState([]);

  let company_description =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, fuga.Nostrum culpa hic perspiciatis reprehenderit iusto minima nobis, a,autem sequi dignissimos possimus. Perspiciatis, nisi eaque ea voluptatem quis sunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates officia totam illum optio obcaecati, corporis placeat eum nihil sapiente maxime magni dolore sint et temporibus quidem libero, ipsum velit tenetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, ratione beatae? Possimus architecto non unde ratione facilis quaerat reiciendis atque aliquid, fugit enim sunt, perferendis nobis quasi ex ipsam fugiat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates natus voluptate sed alias sint corrupti, fuga magnam, velit dignissimos ullam rem laboriosam delectus suscipit. Placeat molestias unde eos harum itaque.";
  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem("token");
      let company = await EmployerController.getCompany(token);

      if (company.status === 200) {
        let employees = [
          {
            name: "John Doe",
            position: "Software Engineer",
          },
          {
            name: "Abdullah",
            position: "Founder",
          },
          {
            name: "Tehsin",
            position: "CEO",
          },
        ];
        let newCompany = { ...company.data.data, employees: employees };
        setCompany(newCompany);
        console.log(newCompany);

        setLoding(false);
      } else if (company.status === 404) {
        setCreate(true);
        setLoding(false);
      } else console.log(company.message);
    };
    const fetchJobs = async () => {
      let jobs = JSON.parse(localStorage.getItem("empJobs"));
      console.log(jobs);
      let date = Date.now();
      let jobDate = jobs[0].createdAt;
      let newDate = new Date(jobDate);

      // Calculate the difference in milliseconds
      let differenceInMilliseconds = date - newDate.getTime();

      // Convert the difference from milliseconds to days
      let differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );

      // console.log(`The job was posted ${differenceInDays} days ago.`);

      jobs = jobs.map((job) => {
        return {
          ...job,
          jobType: "Full Time",
          salary: "$1000 - $2000",
          jobMode: "Hybrid",
          jobPostDays: differenceInDays,
        };
      });
      jobs = jobs.slice(0, 3);
      if (jobs) {
        setJobs(jobs);
      }
    };
    fetchCompany();
    fetchJobs();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (create) {
    return (
      <CompanyForm setEdit={setEdit} Edit={false} setCompany={setCompany} />
    );
  } else if (edit) {
    return (
      <CompanyForm
        setEdit={setEdit}
        Edit={true}
        setCompany={setCompany}
        company={company}
      />
    );
  }
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden-auto bg-slate-100 ">
      <div className="bg-slate-100 flex flex-col items-center w-full">
        <div className=" flex flex-col items-center justify-between">
          <div className="w-full max-h-52 overflow-clip z-3">
            <img
              className="object-cover "
              src={companyBackgroundImg}
              alt="companyBackground"
            />
          </div>
          {/* // company info container */}
          <div className="bg-white w-4/5 lg:w-3/5 p-3 rounded-xl top-52 z-10  absolute shadow-2xl">
            {/* logo and edit button */}
            <div className=" flex mx-10  items-center ">
              <img
                className="w-20 h-20 rounded-full mr-2"
                src={logo}
                alt="companyLogo"
              />
              <div>
                <h1 className="font-bold text-lg">
                  {company.name.toUpperCase()}
                </h1>
                <h2 className="text-sm text-gray-400">{company.industry}</h2>
              </div>
            </div>
            {/* company info */}
            <div className="md:flex md:space-x-32 mx-10">
              <div className="my-2">
                <h1 className="text-gray-500">Website</h1>
                <a
                  href={company.website}
                  target="_blank"
                  className="text-blue-700 text-sm"
                >
                  {company.website}
                </a>
              </div>

              <div className="my-2 ">
                <h1 className="text-gray-500 ">Location</h1>
                <p className="font-bold text-sm">{company.address}</p>
              </div>

              <div className="my-2 ">
                <h1 className="text-gray-500 ">Company Size</h1>
                <p className="font-bold text-sm">
                  {company.employees.length} - {company.employees.length + 50}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* description and jobs */}
        <div className="lg:flex justify-between  lg:w-4/5">
          <div className="mt-60 px-10 w-full text-start lg:w-1/2">
            <h1 className="font-bold text-lg mb-2">About {company.name}</h1>
            <div>
              {isExpanded ? (
                <p className="text-gray-500 text-sm">{company_description}</p>
              ) : (
                <p className="text-gray-500 text-sm">
                  {company_description.substring(0, 200)}
                </p>
              )}
              {/* mui button */}
              <Button
                sx={{ fontSyle: "bold" }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </Button>
            </div>
            <div>
              <h1 className="font-bold text-lg mb-2">
                Jobs from {company.name}
              </h1>
              {/* jobs container */}
              {jobs &&
                jobs.map((job) => (
                  <div className="my-2">
                    <Card className="w-full">
                      <CardContent>
                        <Grid container direction="row">
                          {/* company logo */}
                          <Grid item xs={2} sm={1}>
                            <CardMedia
                              component="img"
                              sx={{
                                marginRight: "3px",
                                width: 50,
                                borderRadius: "50%",
                              }}
                              image={logo}
                              alt="companyLogo"
                            />
                          </Grid>
                          <Grid item xs={10} sm={9}>
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {job.title}
                            </Typography>
                            <Typography
                              style={{
                                color: "gray",
                              }}
                              variant="subtitle2"
                            >
                              {job.location}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <Grid
                            item
                            xs={3}
                            style={{
                              backgroundColor: "#f5f5f5",
                              borderRadius: "5px",
                              padding: "5px 2px 5px 2px",
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {job.jobType}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={2}
                            style={{
                              backgroundColor: "#f5f5f5",
                              borderRadius: "5px",
                              padding: "5px 2px 5px 2px",
                              textAlign: "center",
                              marginLeft: "5px",
                            }}
                          >
                            <Typography variant="body2">
                              {job.jobMode}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={4}
                            style={{
                              backgroundColor: "#f5f5f5",
                              borderRadius: "5px",
                              padding: "5px 2px 5px 2px",
                              textAlign: "center",
                              marginLeft: "5px",
                            }}
                          >
                            <Typography variant="body2">
                              {job.salary}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <Grid>
                            {/* days passed since posted */}
                            <Typography
                              style={{
                                color: "gray",
                              }}
                              variant="subtitle2"
                            >
                              {job.jobPostDays} days ago{" "}
                              <span className="font-bold text-black">. </span>
                              {job.applicants.length} applicants
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

          {/* people section */}
          <div className="px-10 lg:mt-60  w-full text-start lg:w-2/5">
            <h1 className="font-bold text-lg">People at {company.name}</h1>
            <Card className="w-full">
              <CardContent>
                {company.employees.map((employee) => (
                  <Grid
                    container
                    xs={12}
                    sm={12}
                    style={{
                      marginTop: "10px",
                    }}
                    direction="row"
                  >
                    <Grid xs={2} sm={2}>
                      <CardMedia
                        component="img"
                        sx={{
                          marginRight: "3px",
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          objectFit: "cover",
                          objectPosition: "center",
                          transform: "scale(1)",
                        }}
                        image={personImage}
                        alt="companyLogo"
                      />
                    </Grid>
                    <Grid
                      xs={8}
                      sm={8}
                      sx={{
                        textAlign: "start",
                        marginLeft: "10px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        style={{
                          textAlign: "start",
                          fontWeight: "bold",
                        }}
                      >
                        {employee.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{
                          textAlign: "start",
                          color: "gray",
                        }}
                      >
                        {employee.position}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
                <Grid xs={12} sm={12}>
                  <Button
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    variant="outlined"
                  >
                    Show All
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
