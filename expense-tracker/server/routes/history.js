const router = require('express').Router();
const auth = require('../middleware/auth');
const HistoryLog = require('../models/HistoryLog');

// Get history logs for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const logs = await HistoryLog.find({ userId: req.user.id })
      .sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
