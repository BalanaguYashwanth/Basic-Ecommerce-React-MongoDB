import express from "express";
import { Authuser,RegisterUser,UpdateUser,getUsers,removeUsers,updateAdminUser } from "../controllers/Usercontroller.js";
import { requireAuth,admin } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", Authuser);
router.post('/allusers',requireAuth,admin,getUsers)
//router.get('/allusers',requireAuth,admin,getUsers)
router.post("/register",RegisterUser)
router.put("/update",requireAuth,UpdateUser)
router.post('/removeuser/:id',requireAuth,admin,removeUsers)
router.post('/updateadminuser/:id',updateAdminUser)

export default router;

