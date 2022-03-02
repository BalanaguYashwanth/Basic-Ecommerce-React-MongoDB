import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCartItem } from "../redux_store/thunk";
import {
  createSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroupItem,
  ListGroup,
  Form,
  Alert,
  Button,
  Card,
} from "react-bootstrap";
import { cart_item_remove } from "../redux_store/action";
import axios from "axios";
import { getCartItems } from "../redux_store/cart_store/cartThunk";
//import { fetchproductitem,fetchCartItem } from "../redux_store/thunk";
import {fetch_cart_items,fetch_cart_items_data,cart_items_remove,cart_items_error} from '../redux_store/cart_store/cartActions'
import {registerCartItems} from "../redux_store/cart_store/cartThunk";

const CartScreen = () => {
  const Navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  //const cartItem = useSelector(state=>state.cartItems.totalcartItems)
  const cartItem = useSelector((state) => state.carts.cart_item_data);
  const qty = search ? Number(search.split("=")[1]) : 1;

  //console.log(cartItem)

  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
      dispatch(getCartItems(localStorage.getItem('user')))
    }
  },[dispatch])


  async function removeCartItem(item) {
    console.log('item',item)
    const itemdata = {}
    itemdata['productid'] = item._id
    itemdata['qty'] = item.qty
    console.log('itemdata',itemdata)
    await axios.post(`https://ecommerce-backend-mongodb.herokuapp.com/cart/removeitem`,{
      userid:localStorage.getItem('user'),
      cartitems:itemdata,
    })
    .then(res=>dispatch(fetch_cart_items_data(res.data)))
    .catch(err=>dispatch(cart_items_error(err)))
    dispatch(cart_item_remove(item._id));
  }

  function cartItemCheckOut() {
    Navigate("/login?redirect=shipping");
  }

  return (
    <div>
      <Row>
        <Col md={8}>
          {cartItem.length === 0 ? (
            <Alert variant="info">
              Your Cart is empty Please Login to save Items, <Link to="/"> Go Back <i className="fa-solid fa-square-up-right"></i> </Link> {" "}
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItem.map((Item) => (
                <ListGroupItem md={8} key={Item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={Item.image} alt={Item.image} fluid rounded />
                    </Col>
                    <Col>{Item.name}</Col>
                    <Col>{Item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        defaultValue={Item.qty}
                        onChange={(e) =>{
                          dispatch(registerCartItems({'productid':Item._id,'qty': e.target.value}))
                          dispatch(fetchCartItem(Item._id, e.target.value))}
                        }
                      >
                        {[...Array(Item.countInStock).keys()].map((val) => (
                          <option key={val + 1} value={val + 1}>
                            {" "}
                            {val + 1}{"  "}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeCartItem(Item)}
                      >
                        {" "}
                        <i className="fas fa-trash"> </i>{" "}
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
  <Card>
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h2>
          Sub Total (
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
          onClick={cartItemCheckOut}
          disabled={cartItem.length == 0}
        >
          {" "}
          Proceed to Checkout{" "}
        </Button>
      </ListGroupItem>
    </ListGroup>
  </Card>
</Col>;

      </Row>
    </div>
  );
};

export default CartScreen;
