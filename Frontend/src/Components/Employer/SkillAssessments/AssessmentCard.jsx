import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const AssessmentCard = ({ assessment, onView, onEdit, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{assessment.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {assessment.description.substring(0, 100)}... {/* Preview */}
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <Visibility color="primary" onClick={() => onView(assessment)} />
          </Grid>
          <Grid item>
            <Edit color="primary" onClick={() => onEdit(assessment)} />
          </Grid>
          <Grid item>
            <Delete color="error" onClick={() => onDelete(assessment)} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
