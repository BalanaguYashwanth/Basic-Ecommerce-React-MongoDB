import React,{useEffect,useState} from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {user_logout_request} from '../redux_store/action'
import {useNavigate} from 'react-router-dom'
import {fetchUserProfile} from '../redux_store/user_store/userThunk'
import { Link } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [admin,setAdmin]=useState(false)
  const { payload } = useSelector((state) => state.login);
  const {loading,userinfo,error} = useSelector(state=>state.userProfile);

  const logout = () => {
      user_logout_request()
      navigate('/')
      window.location.reload()
  }

  useEffect(async() => {
    if(localStorage.getItem('Auth._Token')) //need to change
    {
      if(!userinfo)
      {
        dispatch(fetchUserProfile(localStorage.getItem('user')))
      }else{
        setAdmin(userinfo.isAdmin)
        //console.log(userinfo.isAdmin)
      }
    }else{
      navigate('/login')
    }      
  },[])


  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand> Yashmerce </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
             {localStorage.getItem('Auth._Token') && (<LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"> </i> Cart
                </Nav.Link>
              </LinkContainer>)}
              {payload || localStorage.getItem('user') ? (
                <NavDropdown title={'My Account'}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item > Profile </NavDropdown.Item>
                  </LinkContainer>
                  {userinfo.isAdmin==="true" && <LinkContainer to="/users">
                  <NavDropdown.Item > Users </NavDropdown.Item>
                </LinkContainer>}
                {userinfo.isAdmin==="true" && <LinkContainer to="/adminproducts">
                  <NavDropdown.Item > Products </NavDropdown.Item>
                </LinkContainer>}
                  <NavDropdown.Item onClick={logout} > Logout </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"> </i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
