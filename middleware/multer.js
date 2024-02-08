// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // specify the directory where images will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Initialize multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   }
// });

// // Check file type (only allow images)
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images only!');
//   }
// }

// // // Route for handling image uploads
// // app.post('/upload', upload.single('profile'), (req, res) => {
// //   // 'profile' should match the field name in the form-data
// //   res.json({ message: 'File uploaded successfully!' });
// // });
