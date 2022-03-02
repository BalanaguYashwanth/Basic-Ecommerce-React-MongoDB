import { USER_DETAILS_ERROR, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,ALL_USER_DETAILS_REQUEST,ALL_USER_DETAILS_ERROR,ALL_USER_DETAILS_SUCCESS } from "./userReferences"

const user_details_request = () => {
    return {
        type:USER_DETAILS_REQUEST
    }
}

const user_details_success = (data) => {
    return{
        type:USER_DETAILS_SUCCESS,
        payload:data
    }
}

const user_details_error = (error) => {
    return{
        type:USER_DETAILS_ERROR,
        payload:error
    }
}

const all_user_details_request = () => {
    return {
        type:ALL_USER_DETAILS_REQUEST
    }
}

const all_user_details_success = (data) => {
    return{
        type:ALL_USER_DETAILS_SUCCESS,
        payload:data
    }
    
}

const all_user_details_error = (error) => {
    return{
        type:ALL_USER_DETAILS_ERROR,
        payload:error
    }
}


export {user_details_request,user_details_success,user_details_error,all_user_details_request,all_user_details_success,all_user_details_error}