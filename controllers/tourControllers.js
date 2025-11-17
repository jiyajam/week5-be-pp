// controllers/tourController.js
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');

// GET /api/tours – list all tours (sorted by createdAt desc)
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving tours',
      error: error.message,
    });
  }
};

// POST /api/tours – create a new tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    return res.status(201).json(tour);
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating tour',
      error: error.message,
    });
  }
};

// GET /api/tours/:tourId – get one tour by ID
exports.getTourById = async (req, res) => {
  const { tourId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  try {
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    return res.status(200).json(tour);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving tour',
      error: error.message,
    });
  }
};

// PUT /api/tours/:tourId – update a tour (replace fields with new data)
exports.updateTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      req.body,
      {
        new: true,         // return updated document
        runValidators: true, // make sure validation runs on update
      }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    return res.status(200).json(updatedTour);
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating tour',
      error: error.message,
    });
  }
};

// DELETE /api/tours/:tourId – delete a tour
exports.deleteTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  try {
    const deletedTour = await Tour.findByIdAndDelete(tourId);

    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // 204 No Content – no body
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting tour',
      error: error.message,
    });
  }
};
