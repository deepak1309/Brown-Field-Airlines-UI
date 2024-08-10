import React, { useCallback, useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
// import "../asserts/css/main.css";
import "../asserts/css/checkin.css";
import head from '../asserts/images/flight head.jpg';
import tail from '../asserts/images/flight tail.jpg';
import axios from 'axios';

function Checkin() {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [pnrNumber, setPnrNumber] = useState('');
    const [bookingData, setBookingData] = useState(null);
    const [response, setResponse] = useState(null);
    const API_URL = 'http://localhost:8080/api/checkin/checkin';

    
    useEffect(() => {
        const storedData = localStorage.getItem('bookingData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.bookingId) {
                setPnrNumber(parsedData.bookingId); 
                setBookingData(parsedData);
            } else {
                console.error('Booking ID is missing from localStorage data');
            }
        } else {
            console.error('No booking details found in localStorage');
        }
    }, []);

   
    const addSeatCallback = useCallback(({ row, number, id }, addCb) => {
        if (!pnrNumber) {
            console.error('PNR is not available yet.');
            return;
        }

        if (id == null) {
            console.error('Seat ID is null');
            return;
        }

        try {
            const payload = { number, pnr: pnrNumber, id }; 
            console.log('Adding seat with payload:', payload);

            setSelectedNumbers(prevNumbers => [...prevNumbers, number]);

            const newTooltip = `Tooltip for id-${id} added by callback`;
            addCb(row, number, id, newTooltip);
        } catch (error) {
            console.error('Error in adding seat:', error.response ? error.response.data : error.message);
        }
    }, [pnrNumber]);

    const removeSeatCallback = useCallback(({ row, number, id }, removeCb) => {
        if (!pnrNumber) {
            console.error('PNR is not available yet.');
            return;
        }

        if (id == null) {
            console.error('Seat ID is null');
            return;
        }

        try {
            const payload = { number, pnr: pnrNumber };
            console.log('Removing seat with payload:', payload);

            setSelectedNumbers(prevNumbers => prevNumbers.filter(num => num !== number));

            const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
            removeCb(row, number, newTooltip);
        } catch (error) {
            console.error('Error in removing seat:', error.response ? error.response.data : error.message);
        }
    }, [pnrNumber]);

    // Handler for checking in
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!pnrNumber) {
            console.error('PNR number is missing');
            setResponse({ error: 'PNR number is missing' });
            return;
        }

        if (!Array.isArray(selectedNumbers)) {
            console.error('Selected numbers is not an array');
            setResponse({ error: 'Selected numbers is not an array' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const payload = {
                pnrNumber,
                seatNumber: selectedNumbers.length > 0 ? selectedNumbers : []
            };

            console.log('Submitting check-in with payload:', payload); 

            const result = await axios.post(API_URL, payload, config);
            setResponse(result.data);
        } catch (error) {
            console.error('Error during check-in:', error.message);
            if (error.response) {
                console.error('Response error data:', error.response.data);
                console.error('Response status:', error.response.status);
            } else if (error.request) {
                console.error('Request error data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            setResponse({ error: 'Failed to check in' });
        }
    };

  
    const rows = [
     
        [
                  { id: 1, number: "A1", isSelected: false, tooltip: "Selected for you" },
                  { id: 2, number: "A2", tooltip: "Cost: 15$" },
       
                  {
                      id: 3,
                      number: "A3",
                      isReserved: true,
                      orientation: "east",
                      tooltip: "Reserved"
                  },
                  null,
                  { id: 4, number: "A4", orientation: "west" },
       
                  { id: 5, number: "A5" },
                  { id: 6, number: "A6" }
              ],
              [
                  {
                      id: 7,
                      number: "B1",
                      isReserved: true,
                      tooltip: "Reserved"
                  },
                  { id: 8, number: "B2", isReserved: true },
       
                  { id: 9, number: "B3", isReserved: true, orientation: "east" },
                  null,
                  { id: 10, number: "B4", orientation: "west" },
       
                  { id: 11, number: "B5" },
                  { id: 12, number: "B6" }
              ],
              [
                  { id: 13, number: "C1" },
                  { id: 14, number: "C2" },
       
                  { id: 15, number: "C3", isReserved: true, orientation: "east" },
                  null,
                  { id: 16, number: "C4", orientation: "west" },
       
                  { id: 17, number: "C5" },
                  { id: 18, number: "C6" }
              ],
              [
                  { id: 19, number: "D1", tooltip: "Cost: 25$" },
                  { id: 20, number: "D2" },
       
                  { id: 21, number: "D3", orientation: "east" },
                  null,
                  { id: 22, number: "D4", orientation: "west" },
       
                  { id: 23, number: "D5" },
                  { id: 24, number: "D6" }
              ],
              [
                  { id: 25, number: "E1", isReserved: true },
                  { id: 26, number: "E2", orientation: "east" },
       
                  { id: 27, number: "E3", isReserved: true },
                  null,
                  { id: 28, number: "E4", orientation: "west" },
       
                  { id: 29, number: "E5", tooltip: "Cost: 11$" },
                  { id: 30, number: "E6", isReserved: true }
              ],
              [
                  { id: 31, number: "F1", isReserved: false },
                  { id: 32, number: "F2", orientation: "east" },
       
                  { id: 33, number: "F3", isReserved: true },
                  null,
                  { id: 34, number: "F4", orientation: "west" },
       
                  { id: 35, number: "F5", tooltip: "Cost: 11$" },
                  { id: 36, number: "F6", isReserved: true }
              ],
              [
                  { id: 37, number: "G1", isReserved: true },
                  { id: 38, number: "G2", orientation: "east" },
       
                  { id: 39, number: "G3", isReserved: false },
                  null,
                  { id: 40, number: "G4", orientation: "west" },
       
                  { id: 41, number: "G5", tooltip: "Cost: 11$" },
                  { id: 42, number: "G6", isReserved: true }
              ],
              [
                  { id: 43, number: "H1", isReserved: true },
                  { id: 44, number: "H2", orientation: "east" },
       
                  { id: 45, number: "H3", isReserved: false },
                  null,
                  { id: 46, number: "H4", orientation: "west" },
       
                  { id: 47, number: "H5", tooltip: "Cost: 11$" },
                  { id: 48, number: "H6", isReserved: false }
              ],
              [
                  { id: 49, number: "I1", isReserved: false },
                  { id: 50, number: "I2", orientation: "east" },
       
                  { id: 51, number: "I3", isReserved: false },
                  null,
                  { id: 52, number: "I4", orientation: "west" },
       
                  { id: 53, number: "I5", tooltip: "Cost: 11$" },
                  { id: 54, number: "I6", isReserved: false }
              ],
              [
                  { id: 55, number: "J1", isReserved: false },
                  { id: 56, number: "J2", orientation: "east" },
       
                  { id: 57, number: "J3", isReserved: true },
                  null,
                  { id: 58, number: "J4", orientation: "west" },
       
                  { id: 59, number: "J5", tooltip: "Cost: 11$" },
                  { id: 60, number: "J6", isReserved: false }
              ]
    ];

    return (
        <div>
            <div className="plane-body">
                <img src={head} className="plane-head" alt="plane head" />
                <SeatPicker
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={2}
                    alpha
                    visible
                    selectedByDefault
                    loading={false}
                    tooltipProps={{ multiline: true }}
                />
                <img src={tail} className="plane-tail" alt="plane tail" />
            </div>
            <div className="card mt-2">
                <div className="card-body">
                    <p className="card-text">
                        Seat Selected : &nbsp;
                        {selectedNumbers.join(', ')}
                    </p>
                    <p>PNR : {pnrNumber}</p>
                    <button type="button" onClick={handleSubmit}>Check-in</button>
                </div>
                {response && (
                    <div>
                        <h2>Check-In Details:</h2>
                        <div className="response-details">
                            {Array.isArray(response) && response.length > 0 ? (
                                response.map((item) => (
                                    <div key={item.id} className="checkin-detail">
                                        <p><strong>Seat Number:</strong> {item.seatNumber}</p>
                                        <p><strong>Check-In Time:</strong> {new Date(item.checkInTime).toLocaleString()}</p>
                                        <p><strong>Check-In Status:</strong> {item.checkInStatus ? 'Checked In' : 'Not Checked In'}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No check-in details available.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkin;
