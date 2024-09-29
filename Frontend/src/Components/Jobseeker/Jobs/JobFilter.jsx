import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField, MenuItem, Box, Typography, Grid, IconButton, Paper, Collapse } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const companies = ["Codewar", "TechSoft", "InnovateX"];
const locations = ["Islamabad", "Karachi", "Lahore"];
const salaryRanges = ["20,000-50,000", "50,000-100,000", "100,000-200,000"];

const JobFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false); // State to manage the open/close status of the filters

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  return (
   
   

    <Paper elevation={3} sx={{ my: '20px', p: 1, borderRadius: '12px', backgroundColor: '#f7f9fc', position: 'relative' }}>
      <Typography
        variant="h5"
        sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#333', cursor: 'pointer' }}
        onClick={() => setOpen(!open)} // Toggle filters on header click
      >
        <IconButton size="large" color="primary">
          <FilterListIcon fontSize="inherit" />
        </IconButton>
        Job Filters
      </Typography>
    
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={2}>
          {/* Company Dropdown */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Company"
              name="company"
              value={searchParams.get('company') || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ pr: 1 }}>
                    <WorkIcon />
                  </IconButton>
                ),
              }}
            >
              <MenuItem value="">
                <em>Select Company</em>
              </MenuItem>
              {companies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
    
          {/* Location Dropdown */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Location"
              name="location"
              value={searchParams.get('location') || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ pr: 1 }}>
                    <LocationOnIcon />
                  </IconButton>
                ),
              }}
            >
              <MenuItem value="">
                <em>Select Location</em>
              </MenuItem>
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
    
          {/* Salary Range Dropdown */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Salary Range"
              name="salaryRange"
              value={searchParams.get('salaryRange') || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ pr: 1 }}>
                    <AttachMoneyIcon />
                  </IconButton>
                ),
              }}
            >
              <MenuItem value="">
                <em>Select Salary Range</em>
              </MenuItem>
              {salaryRanges.map((range) => (
                <MenuItem key={range} value={range}>
                  {range}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
    
          {/* Applicants Input */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Max Applicants"
              type="number"
              name="applicants"
              value={searchParams.get('applicants') || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ pr: 1 }}>
                    <PeopleIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
        
      </Collapse>
    
      {/* Arrow Down Icon at the right-most bottom */}
   
    </Paper>
    
    
  );
};

export default JobFilter;
