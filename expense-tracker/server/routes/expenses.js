const router = require('express').Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
const HistoryLog = require('../models/HistoryLog');

// Get all expenses for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single expense
router.get('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    // Check if expense exists
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check user ownership
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new expense
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    
    const newExpense = new Expense({
      userId: req.user.id,
      amount,
      category,
      date,
      description
    });
    
    const expense = await newExpense.save();
    
    // Log the action
    await new HistoryLog({
      userId: req.user.id,
      actionType: 'Created',
      expenseId: expense._id,
      newData: expense
    }).save();
    
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    
    // Find expense
    const expense = await Expense.findById(req.params.id);
    
    // Check if expense exists
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check user ownership
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Store old data for history
    const oldData = { ...expense._doc };
    
    // Update expense
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.description = description;
    
    const updatedExpense = await expense.save();
    
    // Log the action
    await new HistoryLog({
      userId: req.user.id,
      actionType: 'Updated',
      expenseId: expense._id,
      oldData,
      newData: updatedExpense
    }).save();
    
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find expense
    const expense = await Expense.findById(req.params.id);
    
    // Check if expense exists
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check user ownership
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Store data for history
    const deletedData = { ...expense._doc };
    
    // Delete expense
    await Expense.deleteOne({ _id: req.params.id });
    
    // Log the action
    await new HistoryLog({
      userId: req.user.id,
      actionType: 'Deleted',
      expenseId: expense._id,
      oldData: deletedData
    }).save();
    
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
