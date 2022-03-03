import { fetchShippingAddress,RegisterShippingAddress } from '../controllers/ShippingController.js'
//import { fetchShippingAddress,RegisterShippingAddress } from "../controllers/shippingController.js";
import express from 'express'

const router = express.Router()

router.get('/fetchaddress/:id',fetchShippingAddress)
router.post('/registeraddress',RegisterShippingAddress)

export default router
