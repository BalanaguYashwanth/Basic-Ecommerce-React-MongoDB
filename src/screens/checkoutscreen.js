import FormContainer from "../components/FormContainer.js";
import { CheckoutSteps } from "./checkoutsteps.js";
import { Form, ListGroup, ListGroupItem, Row, Col, Image,Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RequestshippingAddress } from "../redux_store/shipping_store/shippingThunk";
import CartScreen from './cartscreen'
import {fetch_cart_items,fetch_cart_items_data,cart_items_remove,cart_items_error} from '../redux_store/cart_store/cartActions'
import { getCartItems } from "../redux_store/cart_store/cartThunk";
import axios from "axios";
import { fetchCartItem } from "../redux_store/thunk";
import { useNavigate } from "react-router-dom"; 
import {user_logout_request} from '../redux_store/action'

const Checkoutscreen = () => {
  const navigate = useNavigate()
  const cartItem = useSelector((state) => state.carts.cart_item_data);
  const [result, setResult] = useState('')
  const dispatch = useDispatch();
  const { loading, shippingAddress, error } = useSelector(
    (state) => state.shippingAddress
  );

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem('Auth._Token')) {
      dispatch(getCartItems(localStorage.getItem('user')))
      dispatch(RequestshippingAddress(localStorage.getItem("user")));
    } else {
      console.log("please login");
    }
  }, [dispatch]);

  async function feedback(data)
  {
    setResult(data)
    if(localStorage.getItem("user") && localStorage.getItem('Auth._Token'))
    {
      await axios.post('http://localhost:5000/cart/deletecart',{
        AuthToken:localStorage.getItem('Auth._Token'),
        id:localStorage.getItem('user'),
      })
      .then(res=>{
        console.log(res)
        dispatch(getCartItems(localStorage.getItem('user')))
        user_logout_request()
        navigate('/')
      })
      .catch(err=>console.log(err))
    }
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
         
          <Form>
            <Form.Group>
              {shippingAddress && (
                <ListGroup variant="flush">
                  <ListGroupItem>
                  <h2> Shipping </h2>
                    {shippingAddress.address}{', '}
                    {shippingAddress.city}{', '}
                    {shippingAddress.country}{', '}
                    {shippingAddress.postalCode}{'. '}
                  </ListGroupItem>
                  <ListGroupItem>
                   <h2> Payments </h2>
                   <label> Select Method : Paypal or Credit Card </label>
                  </ListGroupItem>
                  <ListGroupItem>
                   <h2> Order Items  </h2>
                   <ListGroup variant="flush">
              {cartItem.map((Item) => (
                <ListGroupItem md={12} key={Item._id}>
                  <Row>
                    <Col md={3}>
                      <Image src={Item.image} alt={Item.image} fluid rounded />
                    </Col>
                    <Col md={3}>{Item.name}</Col>
                    <Col md={3}>{Item.price}</Col>
                    <Col md={3}>
                     {Item.qty}
                    </Col>
                    <Col>
                    
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
                  </ListGroupItem>
                </ListGroup>
              )}
            </Form.Group>
          </Form>
        </Col>
        <Col>
        <Col >
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total (
                {cartItem.reduce(
                  (acc, currentValue, index) =>
                    parseInt(acc) + parseInt(currentValue.qty),
                  0
                )}
                ) items{" "}
              </h2>
              $
              {cartItem
                .reduce(
                  (acc, currentValue, index) =>
                    acc + currentValue.qty * currentValue.price,
                  0
                )
                .toFixed()}
            </ListGroup.Item>
            <ListGroupItem>
              <Button
                className="btn btn-block"
                onClick={()=>(feedback('Order Completed Successfully')) }
                disabled={cartItem.length == 0}
              >
                {" "}
                Proceed to Pay{" "}
              </Button>
              
            </ListGroupItem>
           
          </ListGroup>
        </Card>
        <h6> {result} </h6>
      </Col>;
        
        </Col>
      </Row>
    </div>
  );
};

export { Checkoutscreen };
