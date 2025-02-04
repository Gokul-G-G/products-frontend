import React, { useState } from "react";
import {
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()


  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // client side validations
    if (!email) {
      setErrorMessage("please enter a valid email");
      return;
    }
    if (!password || password.length < 5) {
      setErrorMessage("Please enter a valid password");
      return;
    }
    //   data to pass API
    const data = {
      email: email,
      password: password,
    };
    //   API Call

    try {
      const response = await axios.post("http://localhost:3000/login", data);
      console.log(response.data);
      alert(response.data.message);
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      onLogin();
      navigate("/product");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const handleSignUp = () =>{
    navigate('/user')
  }

  return (
    <div className="banner">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row>
          <Col>
            <Card
              className="shadow-lg p-4 rounded-3 "
              style={{ width: "22rem" }}>
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <FormControl
                      type="email"
                      placeholder="enter email"
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
                      placeholder="enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <p className="mt-3">Don't have an account?</p>
                <button className="btn btn-primary" onClick={handleSignUp}>Signup here</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
