const express = require('express');
const router = express.Router();
// Importing the user controller functions
// These functions handle the logic for creating, retrieving, updating, and deleting users
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
