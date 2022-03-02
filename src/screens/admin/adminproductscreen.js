import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchproducts } from "../../redux_store/thunk.js";
import {useState} from 'react'
import {fetchUserProfile} from '../../redux_store/user_store/userThunk'
import {Alert} from 'react-bootstrap'

export const AdminProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  {loading,data,error} = useSelector(state => state.products);
  const userinfo = useSelector(state=>state.userProfile.userinfo);
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
     if (localStorage.getItem("Auth._Token") && localStorage.getItem("user")) {
      if(!userinfo){
        dispatch(fetchUserProfile(localStorage.getItem('user')))
      }else{
        setAdmin(userinfo.isAdmin)
      }
        dispatch(fetchproducts());
      }else {
      navigate("/login");
    }

  }, [dispatch]);
  

   function deleteuser(id) {
    if (localStorage.getItem("Auth._Token") && localStorage.getItem("user")) {
      axios
        .post(`https://ecommerce-backend-mongodb.herokuapp.com/get/products/removeproduct/${id}`, {
          AuthToken: localStorage.getItem("Auth._Token"),
          id: localStorage.getItem("user"),
        })
        .then((res) => {
          //console.log(res)
          dispatch(fetchproducts());
        })
        .catch((err) => console.log(err));
    }
  }

  // function updateAdmin(useradminid,updateuser)
  // {
  //   //console.log(useradminid,updateuser)
  //   if (localStorage.getItem("Auth._Token") && localStorage.getItem("user")) {
  //       axios
  //         .post(`http://localhost:5000/auth/user/updateadminuser/${useradminid}`, {
  //           AuthToken: localStorage.getItem("Auth._Token"),
  //           id: localStorage.getItem("user"),
  //           updateadmin:updateuser
  //         })
  //         .then((res) => {
  //           //console.log(res)
  //           dispatch(fetchAllUsers());
  //         })
  //         .catch((err) => console.log(err));
  //     }
  // }

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th> ID </th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th>BRAND</th>
          <th></th>
        </tr>
      </thead>
     
      { userinfo && userinfo.isAdmin==='true' ? 
      <tbody>
      {data ?
        data.map((product) => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>
            <Button className='btn btn-sm' onClick={()=>deleteuser(product._id)}  variant='white'> <i className='fas fa-trash' >  </i>  </Button>
            </td>
          </tr>
        )) : <h3 className="align-items-center justify-content-center"> No data found </h3> }
      </tbody>: <div  > <h3> No Data Found </h3> </div> }
    
    </Table>
  );
};
