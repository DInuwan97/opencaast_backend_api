const express = require('express');
const router = express.Router();

const userController = require('./UserController');

router
	.route('/register')
    .post(userController.createUser)

router
	.route('/login')
    .post(userController.loginUser)

router
	.route('/:id')
    .patch(userController.updateUser);

router
    .route('/')
    .get(userController.getUsers);

module.exports = router;