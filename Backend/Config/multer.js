const multer = require('multer');
const path = require('path');


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage });


module.exports = upload;