import {
  Fetch_Products,
  Fetch_Products_Error,
  Fetch_Products_Success,
  Cart_Item_Data,
  Cart_Item_Error,
  Cart_Item_Remove,
  Fetch_Product_Item,
  Fetch_Product_Item_Success,
  Fetch_Product_Item_Error,
  User_Login_Request,
  User_Login_Success,
  User_Login_Error,
  
} from "./actionreferences";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case Fetch_Products:
      return {
        ...state,
        loading: true,
      };
    //break;
    case Fetch_Products_Success:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    //break;
    case Fetch_Products_Error:
      return {
        loading: false,
        error: action.payload,
        data: "",
      };
    //break;
    default:
      return state;
  }
};

const ProductinitialState = {
  loading: false,
  data: [],
  error: "",
};


const reducersProductItem = (state = ProductinitialState, action) => {
  switch (action.type) {
    case Fetch_Product_Item:
      return {
        ...state,
        loading: true,
      };
    //break;
    case Fetch_Product_Item_Success:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    //break;
    case Fetch_Product_Item_Error:
      return {
        loading: false,
        error: action.payload,
        data: "",
      };
    //break;
    default:
      return state;
  }
};



const cartItemState = {
  cart_item_data: [],
  error: "",
};

//console.log('actiondata',cartItemState.cart_item_data)

const cartReducers = (state = cartItemState, action) => {
  //console.log("typeof",(state.cart_item_data).length)
  switch (action.type) {
    case Cart_Item_Data:
      const Item = action.payload;
      const existItem = state.cart_item_data.find((x) => x._id === Item._id);
      //console.log("exist",existItem)
      if (existItem) {
        return {
          ...state,
          error: "",
          cart_item_data: state.cart_item_data.map((x) => (x._id === existItem._id) ? Item : x ),
        };
      } else {
        return {
          error: "",
          cart_item_data: [...state.cart_item_data, Item],
        };
      }

    case Cart_Item_Remove:
        return{
          ...state,
          cart_item_data:state.cart_item_data.filter((item)=> item._id !== action.payload ),
        }

    //break;
    case Cart_Item_Error:
      return {
        cart_item_data: [],
        error: action.payload,
      };
    //break;
    default:
      return state;
      
  }
};

const loginState = {
  loading:false,
  payload:'',
  error:'',
}

const loginReducers = (state = loginState,action) => {
  switch(action.type){
      case User_Login_Request:return {
          ...state,
          loading : true
        }
      case User_Login_Success:return{
        error:'',
        loading:false,
        payload:action.payload
      }
      case User_Login_Error:return{
        payload:'',
        loading:false,
        error:action.error
      }
      default:
        return state
  }
}

export { reducers, cartReducers,reducersProductItem,loginReducers };
