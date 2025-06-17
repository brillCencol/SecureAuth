// routes/auth.routes.js
import express from 'express'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/register').post(authCtrl.register)
router.route('/login').post(authCtrl.login)
router.route('/signout').get(authCtrl.signout)

export default router
