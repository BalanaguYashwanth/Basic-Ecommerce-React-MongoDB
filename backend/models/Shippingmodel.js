import mongoose from 'mongoose'

const shippingSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    address:{type:String, required:true},
    city:{type:String, required:true},
    postalCode:{type:String,required:true},
    country:{type:String,required:true}
})

const shippingModel = mongoose.model('Shipping',shippingSchema)

export default shippingModel
