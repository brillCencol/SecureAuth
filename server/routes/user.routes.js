// routes/user.routes.js
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Public route to create a user (if needed)
router.route('/api/users')
  .post(userCtrl.create) // You may skip this if only /register is used

// Protected routes
router.route('/api/users')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list) // Admin only

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// Middleware to fetch user from :userId param
router.param('userId', userCtrl.userByID)

export default router
