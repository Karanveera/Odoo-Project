const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../middleware/authMiddleware');

// Set upload folder and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder must exist
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/image', verifyToken, upload.single('file'), (req, res) => {
  const fileUrl = `http://localhost:5020/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

module.exports = router;
