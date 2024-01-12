const { Router } = require('express');
const router = Router();
const path = require('path');
const filename = (req, file, callback) => {
    callback(null, file.originalname);
};
const storage = multer.diskStorage({ destination: 'api/uploads/', filename });
const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');

const fileFilter = (req, file, callback) => {
    if (file.mimetype !== 'image/png') {
        req.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'));
    } else {
        callback(null, true);
    }
};
router.post('/upload', upload.single('photo'), async (request, response) => {
    if (request.fileValidationError) {
        return response.status(400).json({ error: request.fileValidationError });
    }
    try {
        await imageProcessor(request.file.filename);
    } catch (error) {

    }

    return response.status(201).json({ success: true });
});

const upload = multer({ fileFilter, storage });
router.get('/photo-viewer', (request, response) => { response.sendFile(photoPath) })


module.exports = router;