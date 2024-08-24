import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import AssessmentCard from "./AssessmentCard";
import employer from "../../../API/employer";
import Loader from "../../Loader/Loader";

const ManageAssessments = () => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);

  useEffect(() => {
    const getAssessments = async () => {
      const company = JSON.parse(localStorage.getItem("company"));

      const data = await employer.getAssessments(
        localStorage.getItem("token"),
        company._id
      );
      if (data.status === 200) {
        setAssessments(data.data.assessment);
        setLoading(false);
        console.log(data);
      } else {
        console.log("Error fetching assessments");
      }
    };
    getAssessments();
  }, []);

  const onView = (assessment) => {
    console.log("View assessment", assessment);
  };

  const onEdit = (assessment) => {
    console.log("Edit assessment", assessment);
  };

  const onDelete = async (assessment) => {
    console.log("Delete assessment", assessment);
    try {
      const data = await employer.deleteAssessment(
        localStorage.getItem("token"),
        assessment._id
      );
      if (data.status === 200) {
        const updatedAssessments = assessments.filter(
          (a) => a._id !== assessment._id
        );
        setAssessments(updatedAssessments);
      } else {
        console.log("Error deleting assessment");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="py-2 px-10">
      <nav className="flex justify-between mb-10">
        <h1 className="font-bold text-2xl text-secondary-dark">
          Manage Skill Assessments
        </h1>
        <NavLink to="./create">
          <Button
            variant="contained"
            sx={{
              fontSize: 12,
            }}
            color="primary"
          >
            Create New Assessment
          </Button>
        </NavLink>
      </nav>

      {assessments ? (
        assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No assessments found
        </Typography>
      )}
    </div>
  );
};

export default ManageAssessments;