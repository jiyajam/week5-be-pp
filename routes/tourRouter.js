// routes/tourRoutes.js
const express = require('express');
const {
  getTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} = require('../controllers/tourControllers');

const router = express.Router();

// /api/tours
router.get('/', getTours);       // GET all
router.post('/', createTour);    // POST new

// /api/tours/:tourId
router.get('/:tourId', getTourById);   // GET one
router.put('/:tourId', updateTour);    // PUT update
router.delete('/:tourId', deleteTour); // DELETE

module.exports = router;
