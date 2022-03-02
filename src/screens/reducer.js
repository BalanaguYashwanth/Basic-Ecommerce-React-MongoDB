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
