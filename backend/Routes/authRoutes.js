import express from 'express'
import { createAuthController, getAuthController, getLiveUserAuthController, getUserByEmailAuthController, loginAuthController } from '../controllers/authController.js'

const router = express.Router();

router.post('/create', createAuthController)
router.get('/get', getAuthController)
router.get('/user/:email', getUserByEmailAuthController)
router.post('/login', loginAuthController)
router.get(`/getLiveUser`, getLiveUserAuthController)

export default router