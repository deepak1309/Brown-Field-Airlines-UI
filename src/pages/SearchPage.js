import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useNavigate } from 'react-router-dom';
import '../asserts/css/SearchPage.css';

const airports = [
  { city: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji International Airport' },
  { city: 'New Delhi', code: 'DEL', airport: 'Indira Gandhi International Airport' },
  { city: 'Bengaluru', code: 'BLR', airport: 'Kempegowda International Airport' },
  { city: 'Pune', code: 'PNQ', airport: 'Pune Airport' },
  { city: 'Chennai', code: 'MAA', airport: 'Chennai International Airport' },
  { city: 'Kolkata', code: 'CCU', airport: 'Netaji Subhas Chandra Bose International Airport' },
  { city: 'Hyderabad', code: 'HYD', airport: 'Rajiv Gandhi International Airport' },
  { city: 'Ahmedabad', code: 'AMD', airport: 'Sardar Vallabhbhai Patel International Airport' },
  { city: 'Goa', code: 'GOI', airport: 'Dabolim Airport' },
  { city: 'Lucknow', code: 'LKO', airport: 'Chaudhary Charan Singh International Airport' },
  { city: 'Jaipur', code: 'JAI', airport: 'Jaipur International Airport' },
  { city: 'Chandigarh', code: 'IXC', airport: 'Chandigarh Airport' },
  { city: 'Coimbatore', code: 'CJB', airport: 'Coimbatore International Airport' },
  { city: 'Thiruvananthapuram', code: 'TRV', airport: 'Trivandrum International Airport' },
  { city: 'Kochi', code: 'COK', airport: 'Cochin International Airport' },
  { city: 'Nagpur', code: 'NAG', airport: 'Dr. Babasaheb Ambedkar International Airport' },
  { city: 'Vadodara', code: 'BDQ', airport: 'Vadodara Airport' },
  { city: 'Bhopal', code: 'BHO', airport: 'Raja Bhoj International Airport' },
  { city: 'Indore', code: 'IDR', airport: 'Devi Ahilya Bai Holkar Airport' },
  { city: 'Patna', code: 'PAT', airport: 'Jay Prakash Narayan International Airport' },
];

const SearchPage = () => {
  const [tripType, setTripType] = useState('oneWay');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const navigate = useNavigate();

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    
    navigate('/results');
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={3} className="paper">
        <Typography variant="h4" component="h1" className="header" gutterBottom>
          Brownfield Airline
        </Typography>
        <Box component="form" noValidate>
          <FormControl component="fieldset" fullWidth margin="normal">
            <RadioGroup
              row
              aria-label="tripType"
              name="tripType"
              value={tripType}
              onChange={handleTripTypeChange}
              className="trip-type"
            >
              <FormControlLabel value="oneWay" control={<Radio />} label="One Way" />
              <FormControlLabel value="roundTrip" control={<Radio />} label="Round Trip" />
            </RadioGroup>
          </FormControl>

          <Grid container spacing={2} className="cards">
            <Grid item xs={12} sm={5} className="card">
              <TextField
                fullWidth
                select
                label="From"
                variant="outlined"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {airports.map((airport) => (
                  <MenuItem key={airport.code} value={airport.code}>
                    {airport.city}, {airport.code} - {airport.airport}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={1} className="card icon-box">
              <SwapHorizIcon className="swap-icon" onClick={handleSwap} />
            </Grid>
            <Grid item xs={12} sm={5} className="card">
              <TextField
                fullWidth
                select
                label="To"
                variant="outlined"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                {airports.map((airport) => (
                  <MenuItem key={airport.code} value={airport.code}>
                    {airport.city}, {airport.code} - {airport.airport}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} className="card">
              <TextField
                fullWidth
                label="Departure Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            {tripType === 'roundTrip' && (
              <Grid item xs={12} sm={6} className="card">
                <TextField
                  fullWidth
                  label="Return Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
            )}
          </Grid>

          <Grid container spacing={2} className="cards">
            <Grid item xs={12} sm={3} className="card">
              <TextField fullWidth select label="Travelers" variant="outlined">
                <MenuItem value="1">1 Traveller</MenuItem>
                <MenuItem value="2">2 Travellers</MenuItem>
                <MenuItem value="3">3 Travellers</MenuItem>
                <MenuItem value="4">4 Travellers</MenuItem>
                <MenuItem value="5">5 Travellers</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3} className="card">
              <TextField fullWidth select label="Class" variant="outlined">
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="premium">Premium Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <FormControl component="fieldset" fullWidth margin="normal">
            <Typography variant="h6" component="div" className="fare-title">
              Select a special fare
            </Typography>
            <RadioGroup
              row
              aria-label="fareType"
              name="fareType"
              className="fare-type"
              defaultValue="regular"
            >
              <Box className="fare-option">
                <FormControlLabel value="regular" control={<Radio />} label="Regular" />
                <Typography className="discount">(Regular fares)</Typography>
              </Box>
              <Box className="fare-option">
                <FormControlLabel value="student" control={<Radio />} label="Student" />
                <Typography className="discount">(Extra discounts/baggage)</Typography>
              </Box>
              <Box className="fare-option">
                <FormControlLabel value="senior" control={<Radio />} label="Senior Citizen" />
                <Typography className="discount">(up to ₹600 off)</Typography>
              </Box>
              <Box className="fare-option">
                <FormControlLabel value="armedForces" control={<Radio />} label="Armed Forces" />
                <Typography className="discount">(up to ₹600 off)</Typography>
              </Box>
              <Box className="fare-option">
                <FormControlLabel value="doctorNurses" control={<Radio />} label="Doctor and Nurses" />
                <Typography className="discount">(up to ₹800 off)</Typography>
              </Box>
            </RadioGroup>
          </FormControl>

          <Button variant="contained"  className="search-button" onClick={handleSearch}>
            SEARCH
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SearchPage;
