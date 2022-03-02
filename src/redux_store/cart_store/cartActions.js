import { CART_ITEMS_ERROR, CART_ITEMS_REMOVE, FETCH_CART_ITEMS, FETCH_CART_ITEMS_DATA } from "./cartReference"

const fetch_cart_items = () => {
    return{
        type:FETCH_CART_ITEMS,
    }
}

const fetch_cart_items_data = (data) => {
    return{
        type:FETCH_CART_ITEMS_DATA,
        payload:data,
    }
}

const cart_items_remove = (id) => {
    return{
        type:CART_ITEMS_REMOVE,
        payload:id,
    }
}

const cart_items_error = (error) => {
    return{
        type:CART_ITEMS_ERROR,
        payload:error,
    }
}

export {fetch_cart_items,fetch_cart_items_data,cart_items_remove,cart_items_error}
