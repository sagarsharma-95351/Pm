const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.get('/', auth, projectController.getProjects);
router.get('/:id', auth, projectController.getProjectById);
router.post('/', auth, projectController.createProject);

module.exports = router;
