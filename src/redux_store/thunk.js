import axios from 'axios'
import {fetch_products_Request,fetch_products_success,fetch_products_error,fetch_cart_item,fetch_cart_error,fetch_product_item_Request,fetch_product_item_success,fetch_product_item_error, user_login_request, user_login_sucess, user_login_error} from './action.js'

function fetchproducts(){
    return(dispatch)=>{
        dispatch(fetch_products_Request())
        axios.get('http://localhost:5000/get/products')
        .then(res=>{
            const alldata=(res.data).map((data) =>(data))
            dispatch(fetch_products_success(alldata))
        })
        .catch(err=>dispatch(fetch_products_error(err)))
    }
}

function fetchproductitem(id){
    //console.log('fetchproductid',id)
    return(dispatch)=>{
        dispatch(fetch_product_item_Request())
        axios.get(`http://localhost:5000/get/products/${id}`)
        .then(res=>{
            dispatch(fetch_product_item_success(res.data))
        })
        .catch(err=>dispatch(fetch_product_item_error(err)))
    }
}

function fetchCartItem(id,qty){
    return(dispatch)=>{
        axios.get(`http://localhost:5000/get/products/${id}`)
        .then(res=>{
            const cartdata = res.data
            cartdata['qty']=qty
            dispatch(fetch_cart_item(cartdata))
        })
        .catch(err=>{dispatch(fetch_cart_error(err))})
    }
}

function fetchUserDetails(email,password){
    return(dispatch) => {
        dispatch(user_login_request())
        axios.post('http://localhost:5000/auth/user',{
            email:email,
            password:password
        }).then(res=>{  
            const logindetails = res.data
            localStorage.setItem('Auth._Token',logindetails.token)
            localStorage.setItem('user',logindetails._id)
            dispatch(user_login_sucess(logindetails))
        }
        )
        .catch(err=>{
            //console.log('yasherr',err.response)
            dispatch(user_login_error(err.response.data))
        })
    }
}

export {fetchproducts,fetchCartItem,fetchproductitem,fetchUserDetails}

