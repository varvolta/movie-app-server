const express = require('express')
const UserController = require('../controllers/user.controller.js')

const userRoutes = express.Router()

userRoutes.post('/login', UserController.login)
userRoutes.post('/register', UserController.register)

module.exports = userRoutes
