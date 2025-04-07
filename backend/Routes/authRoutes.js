import express from 'express'
import { createAuthController, getAuthController, getUserByEmailAuthController, loginAuthController } from '../controllers/authController.js'

const router = express.Router();

router.post('/create', createAuthController)
router.get('/get', getAuthController)
router.get('/user/:email', getUserByEmailAuthController)
router.post('/login', loginAuthController)

export default router