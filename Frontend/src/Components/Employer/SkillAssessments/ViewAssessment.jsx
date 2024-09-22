import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const ViewAssessment = ({ assessment }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {assessment.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {assessment.description}
        </Typography>

        <Typography variant="h6" component="div" style={{ marginTop: '16px' }}>
          Language: {assessment.language}
        </Typography>
        <Typography variant="h6" component="div">
          Time Limit: {assessment.timeLimit} minutes
        </Typography>

        <Typography variant="h6" component="div" style={{ marginTop: '16px' }}>
          Problems
        </Typography>
        <List>
          {assessment.problems.map((problem, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Problem ${index + 1}: ${problem.title}`}
                secondary={
                  <>
                    <pre>{problem.description}</pre>
                    <pre>{problem.initialCode}</pre>
                    <pre>{problem.testCases}</pre>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ViewAssessment;
