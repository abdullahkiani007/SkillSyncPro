import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="bg-white w-96 rounded-lg shadow-md p-6"
      onClick={() => {
        navigate(`../job/${job._id}`);
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" className="font-bold mb-2">
          {job.title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="text-gray-700 mb-4"
        >
          {job.salaryRange}
        </Typography>
        <Box className="flex justify-between items-center text-gray-600">
          <Typography variant="body2" component="p">
            {job.company}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className="text-gray-500"
          >
            {job.location}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
