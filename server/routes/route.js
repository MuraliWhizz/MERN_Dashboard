const express = require('express');
const multer = require('multer');
const controller = require('../controllers/controller');
const cors = require('cors');
const app = express();
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
  }),
}).single('users');

// Routes
router.post('/create', controller.createData);
router.get('/data', controller.listData);
router.get('/search', controller.searchData);
router.get('/data/:_id', controller.getDataById);
router.delete('/delete/:_id', controller.deleteDataById);
router.put('/update/:_id', controller.updateDataById);
router.post('/upload', upload, (req, res) => {
  res.send('File Uploaded');
});

module.exports = router;
