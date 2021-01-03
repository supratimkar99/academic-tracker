const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');

router.get('/:id', classController.getStudents);
router.post('/:id', classController.addStudent);
router.post('/update/:id', classController.editStudent);
router.get('/one/:id', classController.getOneStudent);
router.delete('/delete/:id', classController.deleteStudent);
router.get('/view/:code', classController.viewDetail);

module.exports = router;