import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'; // Ensure these imports

export default function AddPassenger() {
    const [passenger, setPassenger] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: ''
    });

    const [addedPassengers, setAddedPassengers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassenger(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found.');
            return;
        }

        axios.post("http://localhost:8080/api/addPassengerList", [passenger], {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('Passenger added successfully:', res.data);
            setAddedPassengers(prevList => [...prevList, passenger]);
            setPassenger({
                name: '',
                email: '',
                phoneNumber: '',
                gender: ''
            });
        })
        .catch(error => {
            console.error('Error adding passenger list:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <div className="main">
            <h5 style={{ marginLeft: "12px", padding: "3px" }}>
                Traveller Details
            </h5>
            <p style={{ marginLeft: "17px" }}>
                Adult(12 yrs+)
            </p>
            <form
                onSubmit={handleSubmit}
                style={{
                    margin: "9px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Row>
                    <Col>
                        <label>Name</label>
                        <input
                            className="form-control"
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={passenger.name}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <label style={{ display: "flex" }}>Gender</label>
                        <input
                            type="radio"
                            name="gender"
                            value="MALE"
                            onChange={handleChange}
                            id="MALE"
                        />
                        <label style={{ width: "40px", margin: "5px" }} htmlFor="male">
                            MALE
                        </label>

                        <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            onChange={handleChange}
                            id="FEMALE"
                        />
                        <label style={{ margin: "5px" }} htmlFor="female">
                            FEMALE
                        </label>
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ width: "270px" }}
                            placeholder="Email"
                            name="email"
                            value={passenger.email}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <label htmlFor="phone">Mobile No.</label>
                        <input
                            className="form-control"
                            placeholder="Mobile"
                            style={{ width: "250px" }}
                            type="tel"
                            name="phoneNumber"
                            value={passenger.phoneNumber}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <hr />
                <Button 
                    type="submit"
                    style={{
                        padding: "7px",
                        marginRight: "15px",
                        width: "150px",
                        marginTop: "10px",
                    }}
                    size="sm"
                >
                    + ADD NEW ADULT
                </Button>
            </form>

            <div className="booking">
                <h6 style={{ marginTop: "20px" }}>Passenger Details</h6>
                <table
                    style={{ marginTop: "10px" }}
                    border={1}
                    width="100%"
                    cellPadding={10}
                >
                    <tbody>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                        </tr>
                        {addedPassengers.map((info, ind) => {
                            return (
                                <tr key={ind}>
                                    {/* <td>{ind + 1}</td> */}
                                    <td>{info.name}</td>
                                    <td>{info.email}</td>
                                    <td>{info.phoneNumber}</td>
                                    <td>{info.gender}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
