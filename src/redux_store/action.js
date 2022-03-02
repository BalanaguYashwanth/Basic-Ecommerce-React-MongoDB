

const fetch_products_Request=()=>{
    return{
        type:'Fetch_Products'
    }
}

const fetch_products_success = (data) => {
    return{
        type:'Fetch_Products_Success',
        payload:data
    }
}

const fetch_products_error = (error) => {
    return{
        type:'Fetch_Products_Error',
        payload:error
    }
}

const fetch_product_item_Request=()=>{
    return{
        type:'Fetch_Product_Item'
    }
}

const fetch_product_item_success = (data) => {
    return{
        type:'Fetch_Product_Item_Success',
        payload:data
    }
}

const fetch_product_item_error = (error) => {
    return{
        type:'Fetch_Product_Item_Error',
        payload:error
    }
}

const fetch_cart_item = (data) => {
    return{
        type:'Cart_Item_Data',
        payload:data,
    }
}



const fetch_cart_error = (error) => {
    return{
        type:'Cart_Item_Error',
        payload:error,
    }
}

const cart_item_remove = (id) => {
    return{
        type:'Cart_Item_Remove',
        payload:id,
    }
    
}

const user_login_request = () =>{
    return{
        type:'User_Login_Request'
    }
}

const user_login_sucess = (data) => {
    return{
        type:'User_Login_Success',
        payload:data
    }
}

const user_login_error = (error) => {
    return{
        type:'User_Login_Error',
        error : error
    }
}

const user_logout_request = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('Auth._Token')
}

export {user_login_request,user_login_sucess,user_login_error,user_logout_request,fetch_products_Request,fetch_products_success,fetch_products_error, fetch_cart_item,fetch_cart_error,cart_item_remove,fetch_product_item_Request,fetch_product_item_success,fetch_product_item_error}