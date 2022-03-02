import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const CheckoutSteps  = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link > Sign In </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Sign In </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link> Shipping </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link> Shipping </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payments">
            <Nav.Link> Payments </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Payments </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/checkout">
            <Nav.Link> Checkout </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Checkout </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};
