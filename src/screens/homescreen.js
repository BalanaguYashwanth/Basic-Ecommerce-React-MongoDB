import { Card, Row, Col } from "react-bootstrap";
import { Productpage } from "../screens/productpage.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchproducts } from "../redux_store/thunk.js";

export const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products </h1>
      {loading ? (
        <h2> loading... </h2>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col sm={12} md={6} lg={4} xlg={3} key={product._id}>
                <Card className=" my-3  p-4 ">
                  <Productpage product={product} />
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};
