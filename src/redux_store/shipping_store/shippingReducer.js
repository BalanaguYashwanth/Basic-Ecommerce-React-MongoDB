import { ERROR_SHIPPING_ADDRESS, REGISITER_SHIPPING_ADDRESS,FETCH_SHIPPING_ADDRESS } from "./shippingReferences.js"

const initalState={
    loading:false,
    shippingAddress:'',
    error:''
}

const shippingReducer = (state=initalState,action) => {
    switch(action.type)
    {
        case FETCH_SHIPPING_ADDRESS:
            return {...state,loading:true}
        
        case REGISITER_SHIPPING_ADDRESS:
            return {
                loading:false,
                shippingAddress:action.payload,
                error:''
            }
        case ERROR_SHIPPING_ADDRESS:
            return{
                loading:false,
                error:action.payload,
                shippingAddress:'',
            }
        default:
            return {...state}
    }
}

export  {shippingReducer}