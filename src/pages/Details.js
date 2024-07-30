import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../asserts/css/Details.css'

export default function AddPassenger() {
    const [passenger, setPassenger] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: ''
    });

    const [errors, setErrors] = useState({});

    const [addedPassengers, setAddedPassengers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassenger(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!passenger.name) newErrors.name = 'Name is required';
        if (!passenger.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(passenger.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!passenger.phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(passenger.phoneNumber)) {
            newErrors.phoneNumber = 'Phone Number must be 10 digits';
        }
        if (!passenger.gender) newErrors.gender = 'Gender is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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
            setErrors({});
        })
        .catch(error => {
            console.error('Error adding passenger list:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <Container>
            <h5 style={{ marginLeft: "160px", padding: "3px" }}>
                Traveller Details
            </h5>
            <p style={{ marginLeft: "160px" }}>Adult(12 yrs+)</p>
            <form
                onSubmit={handleSubmit}
                style={{
                    margin: 'auto',
                    width:'800px',
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Row>
                    <Col>
                        <label>Full Name</label>
                        <input
                            className="form-control"
                            placeholder="Full name"
                            type="text"
                            name="name"
                            value={passenger.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <span style={{ color: "red" }}>{errors.name}</span>
                        )}
                    </Col>
                    <Col>
                        <label>Email</label>
                        <input
                            className='form-control'
                            type="email"
                            name="email"
                            value={passenger.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <span style={{ color: "red" }}>{errors.email}</span>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <label>Phone Number</label>
                        <input
                            className='form-control'
                            type="tel"
                            name="phoneNumber"
                            value={passenger.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                        {errors.phoneNumber && (
                            <span style={{ color: "red" }}>{errors.phoneNumber}</span>
                        )}
                    </Col>
                    <Col>
                        <label htmlFor="gender">Gender</label>
                        <select
                            className='form-control'
                            name="gender"
                            value={passenger.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select gender</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                        {errors.gender && (
                            <span style={{ color: "red" }}>{errors.gender}</span>
                        )}
                    </Col>
                </Row>
                <hr />
                <Button
                    type="submit"
                    style={{
                        padding: "7px",
                        marginRight: "15px",
                        width: "150px",
                        marginTop: "6px",
                    }}
                    size="sm"
                >
                    + ADD NEW ADULT
                </Button>
            </form>
            <Row className="justify-content-md-center mt-5">
                <Col md="8">
                    <h3 className="text-center">Added Passengers</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedPassengers.length > 0 ? (
                                addedPassengers.map((p, index) => (
                                    <tr key={index}>
                                        <td>{p.name}</td>
                                        <td>{p.email}</td>
                                        <td>{p.phoneNumber}</td>
                                        <td>{p.gender}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No passengers added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
