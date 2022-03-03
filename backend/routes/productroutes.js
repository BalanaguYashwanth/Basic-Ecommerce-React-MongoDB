import  express from "express"
import { getProducts,getProductsById,deleteProduct } from "../controllers/Productcontrollers.js"
import {admin,requireAuth} from '../Middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductsById)

router.route('/removeproduct/:id').post(admin,requireAuth,deleteProduct)

export default router
