import FormContainer from "../components/FormContainer";
import { Form, Button,Alert } from "react-bootstrap";
import { CheckoutSteps } from "./checkoutsteps";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PostshippingAddress,
  RequestshippingAddress,
} from "../redux_store/shipping_store/shippingThunk";

export const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, shippingAddress, error } = useSelector(
    (state) => state.shippingAddress
  );
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [feedback, setFeedback] = useState("");
  //console.log('shippingAddress',!shippingAddress,shippingAddress)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!shippingAddress) {
        dispatch(RequestshippingAddress(localStorage.getItem("user")));
      } else {
        setAddress(shippingAddress.address);
        setCity(shippingAddress.city);
        setPostalCode(shippingAddress.postalCode);
        setCountry(shippingAddress.country);
      }
    }
    //setAddress(shippingAddress.address)
  }, [dispatch, shippingAddress]);

  function submit(address, city, postalCode, country) {
    if (address && city && postalCode && country) {
      dispatch(PostshippingAddress(address, city, postalCode, country));
      navigate("/payments");
    } else {
      setFeedback("Please Fill all the Inputs");
    }
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form>
        <Form.Group>
          <label className="form-label mt-4 label"> Address </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter the address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className="form-label mt-4 label"> City </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter the city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label className="form-label mt-4 label"> Postal Code </label>
          <input
            className="form-control"
            type="Number"
            placeholder="Enter the postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <label className="form-label mt-4 label"> Country </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter the Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button
            to="/payment"
            onClick={() => submit(address, city, postalCode, country)}
            className="btn btn-primary mt-4"
          >
            {" "}
            Continue{" "}
          </Button>
          <p>{feedback} </p>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};
