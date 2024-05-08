const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/thoughtController');

// GET all thoughts
router.get('/', ThoughtController.getAllThoughts);

// GET thought by ID
router.get('/:id', ThoughtController.getThoughtById);

// POST new thought
router.post('/', ThoughtController.createThought);

// PUT update thought by ID
router.put('/:id', ThoughtController.updateThoughtById);

// DELETE thought by ID
router.delete('/:id', ThoughtController.deleteThoughtById);

module.exports = router;