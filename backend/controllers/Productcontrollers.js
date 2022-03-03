import productModel from '../models/productmodel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async(req,res)=>{
    const products = await productModel.find({})
    res.json(products)
})

const getProductsById=asyncHandler(async (req,res)=>{
    const product = await productModel.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.sendStatus(404).json({message:'product not found'})
    }  
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const filterproduct = await productModel.findById(req.params.id)
    //console.log(filterproduct)
    if(filterproduct){
        filterproduct.remove()
        res.json({message:'succesfully deleted'}).sendStatus(200)
    }else{
        res.sendStatus(404)
    }
})

export {getProducts,getProductsById,deleteProduct}