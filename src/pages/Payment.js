import React, { useContext } from 'react';
import { FlightContext } from './Context/FlightContextProvide';
import { Card, CardContent, Typography } from '@mui/material';

export default function Payment() {
  const { booking } = useContext(FlightContext);

  return (
    <div style={{ padding: '20px' }}>
      <Card variant="outlined" style={{ maxWidth: 600, margin: '0 auto' }}>
        <CardContent>
          {booking ? (
            <div>
              <Typography variant="h6" gutterBottom>
                Booking Confirmation
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Booking Date: {new Date(booking.bookingDate).toLocaleString() || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Booking Status: {booking.bookingStatus ? 'Confirmed' : 'Not Confirmed'}
              </Typography>

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Passenger Details
              </Typography>
              {booking.passengers && booking.passengers.length > 0 ? (
                booking.passengers.map((passenger, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      Passenger {index + 1}:
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '16px' }}>
                      Name: {passenger.name || 'N/A'}
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '16px' }}>
                      Email: {passenger.email || 'N/A'}
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '16px' }}>
                      Phone: {passenger.phoneNumber || 'N/A'}
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '16px' }}>
                      Gender: {passenger.gender || 'N/A'}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body1" style={{ fontSize: '16px' }}>
                  No passengers available.
                </Typography>
              )}

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Flight Information
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Flight Number: {booking.flight.flightNumber || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Departure Time: {new Date(booking.flight.departureTime).toLocaleString() || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Arrival Time: {new Date(booking.flight.arrivalTime).toLocaleString() || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Source: {booking.flight.source || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Destination: {booking.flight.destination || 'N/A'}
              </Typography>

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Payment Details
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Payment Date: {new Date(booking.payment.paymentDate).toLocaleString() || 'N/A'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Payment Status: {booking.payment.paymentStatus ? 'Successful' : 'Failed'}
              </Typography>
              <Typography variant="body1" style={{ fontSize: '16px' }}>
                Total Amount: Rs {booking.payment.totalAmount || 'N/A'}
              </Typography>
            </div>
          ) : (
            <Typography variant="body1" style={{ fontSize: '16px' }}>
              No booking information available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
