import asyncHandler from "express-async-handler";
import cartModel from "../models/cartmodel.js";
import mongoose from "mongoose";
//import { ObjectId } from 'mongoose';

const getCartItems = asyncHandler(async (req, res) => {
  const fetchitems = await cartModel.find({});
  res.send(fetchitems);
});

const getCartItemsById = asyncHandler(async (req, res) => {
  const fetchitems = await cartModel.findById(req.params.id);
  res.send(fetchitems);
});

const cartItems = asyncHandler(async (req, res) => {
  const { userid, cartitems } = await req.body;
  const useridexist = await cartModel.findById(userid);
  var filteritems=false
  if (useridexist) {
    await useridexist.cart.map((x) => {
      if (x.productid.toHexString() === req.body.cartitems.productid) {
        filteritems = true
        return true;
      } else {
        return false;
      }
    });
    //console.log('filteritem1',filteritems)
    if (filteritems) {
      useridexist.cart = useridexist.cart.map((x) =>
        x.productid.toHexString() === req.body.cartitems.productid
          ? req.body.cartitems
          : x
      );
      //console.log("cart item", useridexist.cart);
    } else {
      const productid = await mongoose.Types.ObjectId(req.body.cartitems.productid);
      //console.log('qty',req.body.cartitems.qty,req.body.cartitems.productid)
      await useridexist.updateOne({$push:{cart:[{productid:productid,qty:req.body.cartitems.qty}]}})
    }
    const items = await useridexist.save();
    res.send(items);
  } else {
    const cart = await cartModel.create({
      _id: userid,
      cart: cartitems,
    });
    try {
      res.send(cart);
    } catch (err) {
      res.send(err);
    }
  }
});

const removeItem = asyncHandler(async(req, res) => {
  const { userid, cartitems } = await req.body;
  const useridexists = await cartModel.findById(userid)
  var filteruser=false
  if(useridexists)
  {
    const exist = await useridexists.cart.map((x) => {if(x.productid.toHexString() === cartitems.productid) { filteruser=true;  return true} else{ return false} })
    if(filteruser)
    {
      //console.log(await useridexists.updateOne({$pull:{productid:mongoose.Types.ObjectId(cartitems.productid),qty:cartitems.qty}}))  
      await useridexists.updateOne({$pull:{cart:{productid:cartitems.productid,qty:cartitems.qty}}},{multi: true})
    }else{
      res.sendStatus(404)
    }
    const items = await useridexists.save()
    res.send({message:'success'})
  }
});

const deletecart = asyncHandler(async(req,res)=>{
  console.log('hello')
  const cartuser = await cartModel.findById(req.body.id)
  if(cartuser)
  {
    cartuser.remove()
    res.json({'message':'successfully completed'}).sendStatus(200)
  }else{
    res.sendStatus(403)
  }
})

export { getCartItems, cartItems, getCartItemsById,removeItem,deletecart };

// try{
//     const items = await cart.save()
//     res.send(items)
// }catch(err){
//     res.send(err)
// }
