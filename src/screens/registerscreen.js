import { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
//import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [emailAddress, setemailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [err, setErr] = useState('');

  const { search } = useLocation();
  const redirect = search ? `/login?redirect=${search.split("=")[1]}` : "/login";
  //const redirect = search ? `/login?redirect=${search.split("=")[1]}` : "/login";

  function submit(name, emailAddress, password, confirmPassword) {
    if (password === confirmPassword) {
      axios
        .post("http://localhost:5000/auth/user/register", {
          name: name,
          email: emailAddress,
          password: password,
        })
        .then((res) => {
            setErr('')
            navigate(redirect)
        })
        .catch((err) => setErr(err.response.data.message ? err.response.data.message : err.response.data  ));
    }else{
      setErr('Password and Confirm Password are not matching')
    }
  }

  return (
    <FormContainer>
    {err && (
        <Alert variant="danger">
          {err === "Unauthorized" ? "Invalid username and password" : err}
        </Alert>
      )}
      <h1> SIGN UP </h1>
      <Form>
        <label className="form-label mt-4 lead"> Name </label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="form-label mt-4 lead"> Email Address </label>
        <input
          type="email"
          placeholder="Enter email address"
          value={emailAddress}
          className="form-control"
          onChange={(e) => setemailAddress(e.target.value)}
        />
        <label className="form-label mt-4 lead">Password </label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label mt-4 lead">Confirm Password </label>
        <input
          type="password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          className="form-control"
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => submit(name, emailAddress, password, confirmPassword)}
          className="btn btn-primary mt-4"
        >
          
          submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account ?
          <Link
            className="lead"
            to={redirect !== "/login" ? `{/login?redirect=${redirect}}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
