import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../asserts/css/Details.css';

const Traveller = () => {
    
  const initialData = [
    {
      id: 1,
      firstname: "Prashanth",
      lastname: "Sharma",
      email: "prashanth@gmail.com",
      phone: "1234567890",
      gender: "Male",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      phone: "0987654321",
      gender: "Female",
    },
  ];

  const [inputarr, setInputarr] = useState(initialData);
  const [idCounter, setIdCounter] = useState(initialData.length + 1);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!values.firstname.trim()) {
      errors.firstname = "First name is required";
    }
    if (!values.lastname.trim()) {
      errors.lastname = "Last name is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const newUser = {
        id: idCounter,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
      };


        setInputarr([...inputarr, newUser]);
        setIdCounter(idCounter + 1);
        setValues({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          gender: "",
        });
        setErrors({});
        alert("Form submitted successfully");
      } 
  else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
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
              <label>First Name</label>
              <input
                className="form-control"
                placeholder="First name"
                type="text"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
              />
              {errors.firstname && <span style={{ color: "red" }}>{errors.firstname}</span>}
            </Col>
            <Col>
              <label>Last Name</label>
              <input
                className="form-control"
                placeholder="Last name"
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
              />
              {errors.lastname && <span style={{ color: "red" }}>{errors.lastname}</span>}
            </Col>
            <Col>
              <label style={{ display: "flex" }}>Gender</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                checked={values.gender === "Male"}
                onChange={handleChange}
              />
              <label style={{ width: "40px", margin: "5px" }} htmlFor="male">
                Male
              </label>

              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                checked={values.gender === "Female"}
                onChange={handleChange}
              />
              <label style={{ margin: "5px" }} htmlFor="female">
                Female
              </label>
              {errors.gender && <span style={{ color: "red",marginLeft:'11px' }}>{errors.gender}</span>}
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
                value={values.email}
                id="email"
                onChange={handleChange}
              />
              {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </Col>
            <Col>
              <label htmlFor="phone">Mobile No.</label>
              <input
                className="form-control"
                placeholder="Mobile"
                style={{ width: "250px" }}
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
              {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
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
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
              </tr>
              {inputarr.map((info, ind) => {
                return (
                  <tr key={ind}>
                    <td>{info.id}</td>
                    <td>{info.firstname}</td>
                    <td>{info.lastname}</td>
                    <td>{info.email}</td>
                    <td>{info.phone}</td>
                    <td>{info.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Traveller;
