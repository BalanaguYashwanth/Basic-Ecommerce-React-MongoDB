import "./App.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Container } from "react-bootstrap";
import { Home } from "../src/screens/homescreen";
import {Productitem} from "../src/screens/productitem"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from './redux_store/store.js'
import CartScreen from './screens/cartscreen'
import {Login} from './screens/loginscreen'
import {Register} from './screens/registerscreen'
import {Userprofile} from './screens/userprofilescreen'
import {ShippingScreen} from './screens/shippingscreens'
import {PaymentScreen} from './screens/PaymentScreen'
import {Checkoutscreen} from './screens/checkoutscreen'
import {UserScreen} from './screens/admin/adminuserscreen'
import {AdminProductScreen} from './screens/admin/adminproductscreen'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
            <Route path='/checkout' element={<Checkoutscreen />} exact/>
            <Route path='/payments' element={<PaymentScreen />} exact/>
            <Route path='/shipping' element={<ShippingScreen />}  exact/>
            <Route path='/profile' element={<Userprofile />} exact />
            <Route path='/' element={<Home />} exact/>
            <Route path='/Register' element={<Register />} exact /> 
            <Route path='/login' element={<Login />} exact /> 
            <Route path='/product/:id' element={<Productitem/>} exact/>
            <Route path='/cart/:id' element={<CartScreen/>} exact/>
            <Route path='/cart/' element={<CartScreen/>} exact/>
            <Route path='/users' element={<UserScreen/>} exact/>
            <Route path='/adminproducts' element={<AdminProductScreen/>} exact />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
