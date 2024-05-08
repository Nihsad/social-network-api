const express = require('express');
const router = expres.Router();
const UserController = require('..controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

//GET user by ID
router.get('/:id', userController.getUserById);

//POST new user
router.post('/', userController.createUser);

//PUT update user by ID
router.put('/:id', userController.updateUserById);

//DELETE user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;