import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name:{type:String,required:true},
    Rating:{type:Number,required:true,default:0},
    comment:{type:String,required:true},
},{
    timestamps:true
})

const productScheme =  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    reviews:[reviewSchema],
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },rating:{
        type:Number,
        required:true,
        default:0
    },price:{
        type:Number,
        required:true,
        default:0
    },countInStock:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        requird:true,
        deafult:0
    }},{
    timestamps:true
})

const product=mongoose.model('Product',productScheme)

export default product
