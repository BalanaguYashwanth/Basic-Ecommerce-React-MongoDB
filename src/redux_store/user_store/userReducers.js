import {USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_ERROR, ALL_USER_DETAILS_REQUEST, ALL_USER_DETAILS_SUCCESS, ALL_USER_DETAILS_ERROR} from './userReferences'

const userdetailsState={
    loading:false,
    userinfo:'',
    error:''
}

const userdetailsReducer = (state = userdetailsState,action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
           return{
            ...state,
            loading:true,
           }
        case USER_DETAILS_SUCCESS:
            return{
                error:'',
                loading:false,
                userinfo:action.payload,
            }
        case USER_DETAILS_ERROR:
            return{
                error:action.payload,
                laoding:false,
                userinfo:''
            }
        default:
            return state
    }
}

const alluserdetailsState={
    loading:false,
    userinfo:'',
    error:''
}

const alluserdetailsReducer = (state = alluserdetailsState,action) => {
    switch(action.type){
        case ALL_USER_DETAILS_REQUEST:
           return{
            ...state,
            loading:true,
           }
        case ALL_USER_DETAILS_SUCCESS:
            return{
                error:'',
                loading:false,
                userinfo:action.payload,
            }
        case ALL_USER_DETAILS_ERROR:
            return{
                error:action.payload,
                laoding:false,
                userinfo:''
            }
        default:
            return state
    }
}

export {userdetailsReducer,alluserdetailsReducer}