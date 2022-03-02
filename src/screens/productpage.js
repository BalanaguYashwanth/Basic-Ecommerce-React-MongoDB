import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//import { Productitem } from "./productitem";
import Rating from '../screens/rating.js'

export const Productpage = ({ product }) => {
  return (
    <div>
   { product && <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>}
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title> {product.name} </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating rating={product.rating} />
          {/* {product.rating} from {product.numReviews} */} 
        </Card.Text>
        <Card.Text as="h3">  ${product.price} </Card.Text>
      </Card.Body>
    </div>
  );
};
