const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/usersController');
var cors = require('cors')

router.use(cors())

router.get('/', userController.findAll);
router.get('/refresh', userController.refresh);
router.get('/fetch', userController.fetch);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;