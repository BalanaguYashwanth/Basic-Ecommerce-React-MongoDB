import axios from 'axios'
import {fetch_cart_items,fetch_cart_items_data,cart_items_remove,cart_items_error} from './cartActions.js'
import { fetchproductitem,fetchCartItem } from "../thunk";

const getCartItems = (id) => {
    return (dispatch)=>{
        dispatch(fetch_cart_items())
         axios.get(`https://ecommerce-backend-mongodb.herokuapp.com/cart/fetchitems/${id}`)
        .then(res=>{
            dispatch(fetch_cart_items_data(res.data.cart))
            //console.log(res.data.cart)
            const datas = res.data.cart
            datas.map( (data) => {
                //console.log(data.productid,data.qty)
                dispatch(fetchCartItem(data.productid,data.qty))
            })
        })
        .catch(err=>dispatch(cart_items_error(err)))
    }
}

const registerCartItems = (data) => {
    //console.log('data',data)
    return (dispatch)=>{
        dispatch(fetch_cart_items())
         axios.post(`https://ecommerce-backend-mongodb.herokuapp.com/cart/postitems`,{
            userid:localStorage.getItem('user'),
            cartitems:data,
        })
        .then(res=>dispatch(fetch_cart_items_data(res.data)))
        .catch(err=>dispatch(cart_items_error(err)))
    }
}


export {getCartItems,registerCartItems}
