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
import { useLocation, useParams, useNavigate } from "react-router-dom";

import Loader from "../../Loader/Loader";
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
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  let company_description =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, fuga.Nostrum culpa hic perspiciatis reprehenderit iusto minima nobis, a,autem sequi dignissimos possimus. Perspiciatis, nisi eaque ea voluptatem quis sunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates officia totam illum optio obcaecati, corporis placeat eum nihil sapiente maxime magni dolore sint et temporibus quidem libero, ipsum velit tenetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, ratione beatae? Possimus architecto non unde ratione facilis quaerat reiciendis atque aliquid, fugit enim sunt, perferendis nobis quasi ex ipsam fugiat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates natus voluptate sed alias sint corrupti, fuga magnam, velit dignissimos ullam rem laboriosam delectus suscipit. Placeat molestias unde eos harum itaque.";
  useEffect(() => {
    const fetchCompany = () => {
      const company = JSON.parse(localStorage.getItem("companiesData")).filter(
        (company) => {
          return company._id == id;
        }
      )[0];

      setCompany(company);
      console.log("companies", company);

      let jobs = company.jobs;
      console.log("jobs", jobs);
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
          jobPostDays: differenceInDays,
        };
      });
      if (jobs) {
        setJobs(jobs);
      }
      setLoding(false);
    };

    fetchCompany();
  }, []);

  if (loading) {
    return <Loader />;
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
                <p className="text-gray-500 text-sm">{company.description}</p>
              ) : (
                <p className="text-gray-500 text-sm">
                  {company.description.substring(0, 200)}
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
                  <div key={job._id} className="my-2">
                    <Card
                      className="w-full"
                      onClick={() => navigate(`../job/${job._id}`)}
                    >
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
                              {job.employmentType}
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
                              {job.salaryRange} Rs.
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
                        {employee.user.firstName} {employee.user.lastName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{
                          textAlign: "start",
                          color: "gray",
                        }}
                      >
                        {employee.user.role}
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
    // <h1>Details</h1>
  );
};

export default Company;
