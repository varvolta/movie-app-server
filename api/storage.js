const multer = require('multer')

// Set up Multer to store uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    },
})
const upload = multer({ storage })

module.exports = upload
