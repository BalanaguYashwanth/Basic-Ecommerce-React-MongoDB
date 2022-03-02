import { CART_ITEMS_ERROR, CART_ITEMS_REMOVE, FETCH_CART_ITEMS, FETCH_CART_ITEMS_DATA } from "./cartReference"

const cartItemsState={
    loading:false,
    totalcartItems:'',
    error:''
}

const cartItemsReducer = (state = cartItemsState,action) => {
    switch(action.type){
        case FETCH_CART_ITEMS:
           return{
            ...state,
            loading:true,
           }
        case FETCH_CART_ITEMS_DATA:
            return{
                error:'',
                loading:false,
                totalcartItems:action.payload,
            }
        // case CART_ITEMS_REMOVE:
        //     return{
        //         error:'',
        //         loading:false,
        //         totalcartItems:action.payload,
        //     }
        case CART_ITEMS_ERROR:
            return{
                error:action.payload,
                loading:false,
                totalcartItems:''
            }
        default:
            return state
    }
}

export {cartItemsReducer}