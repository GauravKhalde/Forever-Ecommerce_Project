// Importing multer, a library used to handle file uploads in Node.js

import multer from 'multer';

// Creating a storage engine that tells multer how to store files on disk
const storage = multer.diskStorage({
    // This function decides the filename for the uploaded file
    filename: function (req, file, callback) {
        // Save the uploaded file using its original name (e.g., photo.jpg)
        callback(null, file.originalname);
    }
})

// Creating an upload middleware using multer and the above storage engine
const upload = multer({ storage })


// Exporting the upload middleware so we can use it in other files (like route files)
export default upload;
