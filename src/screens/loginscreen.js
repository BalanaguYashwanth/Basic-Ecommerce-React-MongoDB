import {useEffect, useState} from 'react'
import { Form, Button,Row,Col,Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {fetchUserDetails} from '../redux_store/thunk'

export const Login = () => {

  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const {search} = useLocation()
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = search ? `/${search.split('=')[1]}` : '/'
  const {loading,payload,error} = useSelector(state=>state.login)
  console.log('redirect',redirect)

  useEffect(() => {
    if(payload || localStorage.getItem('user'))
    {
      navigate(redirect)
      window.location.reload('/')
    }
  },[payload])

  function submit(email,password){
    dispatch(fetchUserDetails(email,password))
  }

  return (
    <FormContainer>
    {error && <Alert variant='danger'> {error === 'Unauthorized'? 'Invalid username and password' : error } </Alert>}
    <h1>SignIn</h1>
      <Form>
        <Form.Group controlId='email'>
          <label className="form-label mt-4 lead"> Email Address </label>
          <input as="email" type="email" placeholder="Enter email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}  />
          <label className='form-label mt-4 lead' > Password </label>
          <input as="password" type="password" placeholder="Enter password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={()=>(submit(email,password))} type="button" className="btn btn-primary mt-4"> submit </Button>
          </Form.Group>
      </Form>
      <Row className="py-3">
          <Col> New Customer ? <Link className='lead' to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register' } > Register  </Link> </Col>
      </Row>
    </FormContainer>
  );
};
