const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getAllPlayers);
router.get('/add', playerController.getAddPlayerForm);
router.post('/add', playerController.addPlayer);
router.get('/:id', playerController.getPlayerById);
router.get('/:id/edit', playerController.getEditPlayerForm);
router.post('/:id/edit', playerController.editPlayer);
router.post('/:id/action/:type', playerController.performAction);

module.exports = router;