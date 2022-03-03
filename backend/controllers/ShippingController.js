import Shipping from "../models/Shippingmodel.js";
import asyncHandler from "express-async-handler";

const fetchShippingAddress = asyncHandler(async (req, res) => {
  const getAddress = await Shipping.findById(req.params.id);
  res.send(getAddress);
});

const RegisterShippingAddress = asyncHandler(async (req, res) => {
  const { _id, address, city, postalCode, country } = await req.body;
  const shippingAddress = await Shipping.create({
    _id:{_id},
    address,
    city,
    postalCode,
    country,
  });
  res.json(shippingAddress);
});

export { fetchShippingAddress, RegisterShippingAddress };
