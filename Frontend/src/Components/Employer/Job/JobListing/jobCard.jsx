import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={() => {
        navigate(`../job/${job._id}`);
      }}
    >
      <CardContent className="p-6">
        <Typography
          variant="h6"
          component="div"
          className="font-bold mb-2 text-gray-900"
        >
          {job.title}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          className="text-gray-700 mb-4"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job.description}
        </Typography>

        <Box className="flex justify-between items-center mb-4">
          <Typography
            variant="body1"
            component="p"
            className="text-gray-900 font-medium"
          >
            Salary: {job.salaryRange}
          </Typography>
          <Chip
            label={job.employmentType}
            color="primary"
            variant="outlined"
            size="small"
            className="capitalize"
          />
        </Box>

        <Box className="flex justify-between items-center mb-2 text-gray-600">
          <Box className="flex items-center">
            <WorkIcon className="mr-1 text-blue-500" fontSize="small" />
            <Typography variant="body2" component="p" className="font-medium">
              {job.companyName}
            </Typography>
          </Box>
          <Box className="flex items-center">
            <LocationOnIcon className="mr-1 text-green-500" fontSize="small" />
            <Typography
              variant="body2"
              component="span"
              className="font-medium"
            >
              {job.location}
            </Typography>
          </Box>
        </Box>

        <Box className="flex items-center text-gray-600">
          <PeopleIcon className="mr-1 text-purple-500" fontSize="small" />
          <Typography variant="body2" component="p">
            {job.applicants.length} Applicants
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
