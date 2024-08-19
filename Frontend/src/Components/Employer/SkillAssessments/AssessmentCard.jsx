import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

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
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onView(assessment)}
            >
              View
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onEdit(assessment)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(assessment)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
