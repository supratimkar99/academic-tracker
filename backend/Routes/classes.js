const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');

router.post('/:id', classController.create);
router.get('/:id', classController.getAll);
router.get('/getname/:id', classController.getName);

module.exports = router;