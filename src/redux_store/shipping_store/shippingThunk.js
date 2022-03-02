import axios from 'axios'
import {fetch_shipping_address,register_shipping_address,error_shipping_address} from './shippingActions'

function RequestshippingAddress(id){
    return(dispatch)=>{
        dispatch(fetch_shipping_address())
        axios.get(`https://ecommerce-backend-mongodb.herokuapp.com/shipping/fetchaddress/${id}`)
        .then(res=>{dispatch(register_shipping_address(res.data))})
        .catch(err=>{dispatch(error_shipping_address(err))})
    }
}

function PostshippingAddress(address,city,postalCode,country){
    return(dispatch)=>{
        dispatch(fetch_shipping_address())
        axios.post('https://ecommerce-backend-mongodb.herokuapp.com/shipping/registeraddress',{
            _id:localStorage.getItem('user'),
            address,
            city,
            postalCode,
            country
        })
        .then(res=>{dispatch(register_shipping_address(res.data))})
        .catch(err=>{dispatch(error_shipping_address(err))
        
            console.log(err.response)
        })
    } 
}

export {RequestshippingAddress,PostshippingAddress}
