const mongoose = require('mongoose');

const HistoryLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionType: {
    type: String,
    enum: ['Created', 'Updated', 'Deleted'],
    required: true
  },
  expenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  oldData: {
    type: Object
  },
  newData: {
    type: Object
  }
});

module.exports = mongoose.model('HistoryLog', HistoryLogSchema);
