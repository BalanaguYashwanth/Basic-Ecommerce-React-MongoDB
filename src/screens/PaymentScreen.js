import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { CheckoutSteps } from "./checkoutsteps";
import { LinkContainer } from "react-router-bootstrap";

export const PaymentScreen = () => {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form>
        <Form.Group>
          <Form.Label as="legend"> Select Method</Form.Label>
          <Form.Check
            type="radio"
            label="Paypal or Credit Card"
            id="Paypal"
            defaultChecked
          ></Form.Check>
        </Form.Group>
        <LinkContainer to='/checkout'>
        <Button className="btn btn-primary mt-4"> Continue </Button>
        </LinkContainer>
      </Form>
    </FormContainer>
  );
};
