import express from 'express';
import SpecialReport from '../models/totalreport.model.js'; // Adjust the import based on your project structure

const router = express.Router();

router.post('/', async (req, res) => {
  const { location, startdate, enddate } = req.body;

  try {
    const report = new SpecialReport({ location, startdate, enddate });
    await report.save();
    res.status(201).json({ message: 'Special report created successfully' });
  } catch (error) {
    console.error('Error saving special report:', error);
    res.status(500).json({ error: 'Failed to create special report' });
  }
});

export default router;
