import express from "express";
import products from "./data/products.js";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import Productroutes from "./routes/productroutes.js";
import { error } from "./ErrorHandling/error.js";
import Userruotes from "./routes/userroutes.js";
import cartroutes from './routes/cartroutes.js'
import shippingAddressroutes from './routes/shippingRoutes.js'
import cookieParser from 'cookie-parser'


dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/get/products", Productroutes);
app.use("/auth/user", Userruotes);
app.use("/cart",cartroutes)
app.use('/shipping',shippingAddressroutes)
app.use(error);

// app.get("/products", (req, res) => {
//   res.json(products);
// });

// app.get("/products/:id",(req,res)=>{
//   const product = products.find((p)=> p._id ===  req.params.id)
//   res.json(product)
// })

let PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(
    `Yashserver is running.. ${process.env.NODE_ENV} and ${PORT}`.yellow.inverse
  )
);
