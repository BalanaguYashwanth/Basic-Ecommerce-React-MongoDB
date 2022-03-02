import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { fetchUserProfile } from "../redux_store/user_store/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Userprofile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.login);
  const { loading, userinfo, error } = useSelector(
    (state) => state.userProfile
  );
  const [name, setName] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [feedback, setFeedback] = useState("");

  //console.log('loggedInUser',loading)

  useEffect(() => {
    if (loggedInUser.payload || localStorage.getItem("user")) {
      if (!userinfo) {
        if (localStorage.getItem("Auth._Token")) {
          //need to change
          dispatch(fetchUserProfile(localStorage.getItem("user")));
        } else {
          navigate("/login");
        }
      } else {
        setName(userinfo.name);
        setemailAddress(userinfo.email);
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, userinfo, loggedInUser]);

  function submit(name, email) {
    setLoader(true);
    axios
      .put("http://localhost:5000/auth/user/update", {
        _id: localStorage.getItem("user"),
        name: name,
        email: email,
      })
      .then((res) => {
        setFeedback(true);
        dispatch(fetchUserProfile(localStorage.getItem("user")));
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }

  return (
    <Row>
      <Col>
        <h2> User Profile</h2>
        {error && <Alert> {error} </Alert>}
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        )}
        <Form >
          <Form.Group>
            <label className="form-label mt-4 lead"> Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
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

            <Button
              type="button"
              onClick={() => submit(name, emailAddress)}
              className="btn btn-primary mt-4"
            >
              {loader === false ? (
                <span> submit </span>
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              )}
            </Button>
          </Form.Group>
          {feedback && <span> successfully updated </span>}
        </Form>
      </Col>
    </Row>
  );
};
