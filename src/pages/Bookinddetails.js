import React, { useContext, useEffect } from 'react';
import { FlightContext } from './Context/FlightContextProvide';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

export default function BookingDetails() {
  const { bookingDetails } = useContext(FlightContext);

  useEffect(() => {
    console.log('Booking Details:', bookingDetails);
  }, [bookingDetails]);

  return (
    <div style={{ padding: '20px' }}>
      {bookingDetails ? (
        <Card style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div" style={{ marginBottom: '20px' }}>
              Booking Details
            </Typography>

            {/* Passenger Details */}
            {bookingDetails.passengers && bookingDetails.passengers.length > 0 ? (
              <>
                {/* <Typography variant="h6" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
                  Passenger Details
                </Typography> */}
                <Grid container spacing={2}>
                  {bookingDetails.passengers.map((passenger, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card variant="outlined" style={{ marginBottom: '10px' }}>
                        <CardContent>
                          <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                            <strong>Passenger {index + 1}:</strong>
                          </Typography>
                          <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                            <strong>Name:</strong> {passenger.name}
                          </Typography>
                          <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                            <strong>Email:</strong> {passenger.email}
                          </Typography>
                          <Typography variant="body1" component="div">
                            <strong>Mobile Number:</strong> {passenger.phoneNumber}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Typography variant="body1" component="div" style={{ color: 'grey' }}>
                No passenger details available.
              </Typography>
            )}

            {/* Booking Details */}
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Flight Number:</strong> {bookingDetails.flight.flightNumber}
            </Typography>
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Source:</strong> {bookingDetails.flight.source}
            </Typography>
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Destination:</strong> {bookingDetails.flight.destination}
            </Typography>
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Aircraft Name:</strong> {bookingDetails.flight.aircraft.name}
            </Typography>
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Aircraft Model:</strong> {bookingDetails.flight.aircraft.model}
            </Typography>
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Payment Date:</strong> {bookingDetails.payment.paymentDate}
            </Typography>
            <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
              <strong>Total Price:</strong> {bookingDetails.payment.totalAmount}
            </Typography>

            {/* Confirm Booking Button */}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px',marginLeft:"550px" }}
              onClick={() => console.log('Confirm Booking clicked')}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" component="div" style={{ color: 'grey' }}>
          No booking details available.
        </Typography>
      )}
    </div>
  );
}
