import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux_store/user_store/userThunk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {fetchUserProfile} from '../../redux_store/user_store/userThunk'
import {useState} from 'react'

export const UserScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userinfo, error } = useSelector((state) => state.allusers);
  const [admin,setAdmin]=useState(false)

  useEffect(() => {
     if (localStorage.getItem("Auth._Token") && localStorage.getItem("user") ) {
        //need to change
        dispatch(fetchAllUsers());
      } 
    else {
      navigate("/login");
    }
  }, []);
  

  function deleteuser(id) {
    if (localStorage.getItem("Auth._Token") && localStorage.getItem("user")) {
      axios
        .post(`http://localhost:5000/auth/user/removeuser/${id}`, {
          AuthToken: localStorage.getItem("Auth._Token"),
          id: localStorage.getItem("user"),
        })
        .then((res) => {
          //console.log(res)
          dispatch(fetchAllUsers());
        })
        .catch((err) => console.log(err));
    }
  }

  function updateAdmin(useradminid,updateuser)
  {
    //console.log(useradminid,updateuser)
    if (localStorage.getItem("Auth._Token") && localStorage.getItem("user")) {
        axios
          .post(`http://localhost:5000/auth/user/updateadminuser/${useradminid}`, {
            AuthToken: localStorage.getItem("Auth._Token"),
            id: localStorage.getItem("user"),
            updateadmin:updateuser
          })
          .then((res) => {
            //console.log(res)
            dispatch(fetchAllUsers());
          })
          .catch((err) => console.log(err));
      }
  }

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th> ID </th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userinfo ?
          userinfo.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <input defaultChecked={user.isAdmin==='true'} style={{width:15, height:13}} type="checkbox" onChange={()=>(updateAdmin(user._id,user.isAdmin === "true" ? "false":"true"))} />
              </td>
              <td>
                <Button
                  variant="white"
                  className="btn-sm"
                  onClick={() => deleteuser(user._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          )) : <h3 className="align-items-center justify-content-center"> No data found </h3> }
      </tbody>
    </Table>
  );
};
