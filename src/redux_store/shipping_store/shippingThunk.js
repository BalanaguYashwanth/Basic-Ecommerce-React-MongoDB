import axios from 'axios'
import {fetch_shipping_address,register_shipping_address,error_shipping_address} from './shippingActions'

function RequestshippingAddress(id){
    return(dispatch)=>{
        dispatch(fetch_shipping_address())
        axios.get(`http://localhost:5000/shipping/fetchaddress/${id}`)
        .then(res=>{dispatch(register_shipping_address(res.data))})
        .catch(err=>{dispatch(error_shipping_address(err))})
    }
}

function PostshippingAddress(address,city,postalCode,country){
    return(dispatch)=>{
        dispatch(fetch_shipping_address())
        axios.post('http://localhost:5000/shipping/registeraddress',{
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
