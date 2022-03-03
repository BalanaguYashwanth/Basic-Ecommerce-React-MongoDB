import orderModel from './models/ordermodel.js'
import productModel from './models/productmodel.js'
import userModel from './models/usermodel.js'
import users from './data/users.js'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectdb from './config/db.js'
import colors from 'colors'
import mongoose from 'mongoose'

dotenv.config()
connectdb()

const importdata =async ()=>{
    try{
        await userModel.deleteMany()
        await productModel.deleteMany()
        await orderModel.deleteMany()
    
        const allusers=await userModel.insertMany(users) //mainly sample user datas collab user models
        const adminusers = allusers[0]._id
        const sampleproducts = products.map((product) => {
            return {...product,user:adminusers}
        })
        productModel.insertMany(sampleproducts) //mainly sample user & product datas collab product models
        console.log('working successfully')
    }catch(error){
        console.log(`${error.message}`.red.inverted)
    }  
}

const destroydata = async()=>{
    try{
        await userModel.deleteMany()
        await productModel.deleteMany()
        await orderModel.deleteMany()
    
        console.log("deleted the data")
        process.exit()
    }catch(error){
        console.log(`${error.message}`.red.inverse)
        process.exit(1)
    }  
}

if(process.argv[2]=== '-d')
{
    destroydata()
}else{
    importdata()
}
