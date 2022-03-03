import express from 'express'
import {getCartItems,cartItems,getCartItemsById,removeItem,deletecart} from '../controllers/CartController.js'
import {admin,requireAuth} from '../Middleware/authMiddleware.js'

const router = express.Router()
router.get('/fetchitems',getCartItems)
router.get('/fetchitems/:id',getCartItemsById)
router.post('/postitems',cartItems)
router.post('/removeitem',removeItem)
router.post('/deletecart',requireAuth,deletecart)

export default router