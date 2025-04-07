import express from 'express'
import { createAuthController, getAuthController, getUserByEmailAuthController } from '../controllers/authController.js'

const router = express.Router();

router.post('/create', createAuthController)
router.get('/get', getAuthController)
router.get('/user/:email', getUserByEmailAuthController)

export default router