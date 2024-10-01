const express = require('express');
const router = express.Router();
const minigameController = require('../controllers/minigameController');

router.get('/penalty/:id', minigameController.getPenaltyGame);
router.post('/penalty/:id', minigameController.playPenalty);

module.exports = router;