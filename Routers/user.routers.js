import express from 'express'
import { getUser, userLogin, userRegister } from '../Controllers/user.controller.js'
import { userMiddleware } from '../Middleware/user.middleware.js'


const router = express.Router()

router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/getuser",userMiddleware,getUser)


export default router;