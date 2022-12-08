import express from 'express'
import multer from 'multer';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../middleware/verifyToken.js';
import path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== ".mkv" && ext !== ".mp4") {
            return cb(new Error("Only videos are allowed!"));
        }

        cb(null, true);
    },
});


const router = express.Router();

router.post('/', verifyToken, upload.single('videos'), addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addView)
router.get('/trend', trend)
router.get('/random', random)
router.get('/sub', verifyToken, sub)
router.get('/tags', getByTag)
router.get('/search', search)

export default router;