import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  });

const cartSchema = mongoose.Schema(
  {
    cart: [itemsSchema],
  },
  {
    timestamps: true,
  }
);

const cart = mongoose.model("Cart", cartSchema);

export default cart;
