import axios from 'axios'
import {user_details_request,user_details_success,user_details_error,all_user_details_request,all_user_details_success,all_user_details_error} from './userActions'


const fetchUserProfile = (id) => {
    return(dispatch)=>{
        user_details_request()
        axios.put('http://localhost:5000/auth/user/update',{
            AuthToken:localStorage.getItem('Auth._Token'),
            _id:id
        })
        .then(res=>dispatch(user_details_success(res.data)))
        .catch(err=>dispatch(user_details_error(err.response)))
    }
}


const fetchAllUsers = () => {
    return(dispatch)=>{
        all_user_details_request()
        axios.post('http://localhost:5000/auth/user/allusers',{
            AuthToken:localStorage.getItem('Auth._Token'),
            id:localStorage.getItem('user')
        })
        .then(res=>dispatch(all_user_details_success(res.data)))
        .catch(err=>{
            console.log('err',err)
            dispatch(all_user_details_error(err.response))})
    }
}

export {fetchUserProfile, fetchAllUsers}