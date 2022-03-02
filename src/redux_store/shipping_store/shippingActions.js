import { ERROR_SHIPPING_ADDRESS, REGISITER_SHIPPING_ADDRESS,FETCH_SHIPPING_ADDRESS } from "./shippingReferences.js"

const fetch_shipping_address=()=>{
    return{
        type:FETCH_SHIPPING_ADDRESS
    }
}

const register_shipping_address=(data)=>{
    return{
        type:REGISITER_SHIPPING_ADDRESS,
        payload:data
    }
}

const error_shipping_address=(err)=>{
    return{
        type:ERROR_SHIPPING_ADDRESS,
        payload:err
    }
}

export {fetch_shipping_address,register_shipping_address,error_shipping_address}