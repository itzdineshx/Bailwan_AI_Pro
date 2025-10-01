const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');
const {
  uploadProfilePicture,
  uploadWorkoutImage,
  uploadPostImages,
} = require('../middleware/upload');

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture file (max 5MB, images only)
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Invalid file or upload error
 *       401:
 *         description: Unauthorized
 */
router.post('/profile-picture', auth, (req, res) => {
  uploadProfilePicture(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'File upload error',
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return file information
    res.json({
      message: 'Profile picture uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
      }
    });
  });
});

/**
 * @swagger
 * /upload/workout-image:
 *   post:
 *     summary: Upload workout image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               workoutImage:
 *                 type: string
 *                 format: binary
 *                 description: Workout image file (max 5MB, images only)
 *     responses:
 *       200:
 *         description: Workout image uploaded successfully
 *       400:
 *         description: Invalid file or upload error
 *       401:
 *         description: Unauthorized
 */
router.post('/workout-image', auth, (req, res) => {
  uploadWorkoutImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'File upload error',
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      message: 'Workout image uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
      }
    });
  });
});

/**
 * @swagger
 * /upload/post-images:
 *   post:
 *     summary: Upload post images
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Post images (max 5 files, 5MB each, images only)
 *     responses:
 *       200:
 *         description: Post images uploaded successfully
 *       400:
 *         description: Invalid files or upload error
 *       401:
 *         description: Unauthorized
 */
router.post('/post-images', auth, (req, res) => {
  uploadPostImages(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'File upload error',
        error: err.message
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${file.filename}`,
    }));

    res.json({
      message: `${req.files.length} post images uploaded successfully`,
      files: uploadedFiles,
    });
  });
});

/**
 * @swagger
 * /upload/{filename}:
 *   get:
 *     summary: Get uploaded file
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Filename of the uploaded file
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       404:
 *         description: File not found
 */
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Send file
  res.sendFile(filePath);
});

module.exports = router;