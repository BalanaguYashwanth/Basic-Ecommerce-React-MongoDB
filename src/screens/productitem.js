import { useParams } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Rate from "./rating.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchproductitem, fetchCartItem } from "../redux_store/thunk.js";
import { getCartItems } from "../redux_store/cart_store/cartThunk";
import { registerCartItems } from "../redux_store/cart_store/cartThunk";
import axios from "axios";

export const Productitem = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productItem.data);
  const loading = useSelector((state) => state.products.loading);
  const cartItem = useSelector((state) => state.carts.cart_item_data);
  const [redirect, setRedirect] = useState("false");

  //console.log(cartItem)

  useEffect(() => {
    dispatch(fetchproductitem(params.id)); // dispatch for product items
    dispatch(getCartItems(localStorage.getItem("user")));
  }, [dispatch, params.id]);

  const addToCart = async () => {
    if(localStorage.getItem('user') && localStorage.getItem('Auth._Token'))
    {
    navigate(`/cart/${params.id}?qty=${qty}`);
    await dispatch(registerCartItems({ productid: params.id, qty: qty }));
    await dispatch(fetchCartItem(params.id, qty)); //main dispatch for cart items
    }else{
      navigate('/login')
    }
  };

  // if(cartItem && product)
  // {
  //   for(let x in cartItem)
  //   {
  //     console.log('cartItems',x._id)
  //     if(x._id === product._id)
  //     {
  //       console.log('hello')
  //       setRedirect(true)
  //       break
  //     }
  //   }
  // }
  //console.log(cartItem)

   function filter(allitems, productitem) {
    const mainItem =  allitems.filter((x) => x._id === productitem);
    //console.log("mainitem", mainItem.length);
    
    if (mainItem.length > 0) {
      //console.log('hello true')
      for (let y in mainItem) {
        if (mainItem[y]._id === productitem) {
          //console.log('hello true2')
          return true;
        }
      }
    } else {
      return false;
    }

  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <h2> Loading... </h2>
      ) : (
        <Row className="text-dark">
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                Rating: <Rate rating={product.rating}> </Rate>
                {/* {product.rating} from {product.numReviews}  */}
              </ListGroupItem>
              <ListGroupItem> Price: ${product.price} </ListGroupItem>
              <ListGroupItem>Description: {product.description} </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col> Qty </Col>
                      <Col>
                        {product.countInStock > 0 && (
                          <Form.Control
                            as="select"
                            defaultValue={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    onClick={addToCart}
                    className="btn btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                  {cartItem && filter(cartItem, product._id) ? (<div> Go to cart </div>) : (<div> Add to cart </div>)}
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};
