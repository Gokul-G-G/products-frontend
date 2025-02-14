import axios from 'axios'
import React, { useState } from 'react'
import {Container,Col,Row,Card,Form,FormControl,Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // Client side Validation
        if (!name) {
          setErrorMessage("Enter Your Name");
          return;
        }
        if(!email){
            setErrorMessage("Enter a Valid Email")
            return
        }
        if(!password || password.length < 5){
            setErrorMessage("Enter Password with minimum 5 charector length")
            return
        }
        setErrorMessage('')
        // Data to pass API
        const data = {
            name:name,
            email:email,
            password:password,
        }
        
        try {
            const response = await axios.post(
              "https://products-backend-slgn.onrender.com/user",
              data
            );
            console.log(response.data)
            alert(response.data.message);
            navigate('/login')
        } catch (error) {
            setErrorMessage(error.message);
            console.log(error);
        }

    }
     const handlelogin = () => {
       navigate("/login");
     };

  return (
    <div className="banner">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row>
          <Col>
            <Card className="shadow-lg p-4 rounded">
              <Card.Body>
                <h3 className="text-center mb-4" style={{ width: "22rem" }}>
                  Sign Up
                </h3>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>
                      Name <span className="text-danger">*</span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <FormControl
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Password <span className="text-danger">*</span>
                    </Form.Label>
                    <FormControl
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign Up
                  </Button>
                </Form>
                <p className="mt-3">Already have an account?</p>
                <button className="btn btn-primary" onClick={handlelogin}>
                  Log In Here
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup
