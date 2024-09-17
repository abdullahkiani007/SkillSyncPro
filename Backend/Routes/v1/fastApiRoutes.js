const express = require('express');
const FastApiRouter = express.Router();
const fastApiController = require('../../Controllers/FastApiController');
const multer = require('multer');
const path = require('path');
const upload = require('../../Config/multer');


// // Configure multer for file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
        
//         cb(null,file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// Define routes

// Route to upload a job (as JSON)
FastApiRouter.post('/upload_job', async (req, res) => {
    try {
        const result = await fastApiController.uploadJob(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload job' });
    }
});

// Route to upload a resume (as file)
FastApiRouter.post('/upload_resume/', upload.single('resume'), async (req, res) => {

    try {
        console.log('Uploading resume fastapi router:', req.file.path);
        const result = await fastApiController.uploadResume(req.file.path); // Send file path to FastAPI
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload resume' });
    }
});

// Route to match resumes
FastApiRouter.post('/match_resumes/', async (req, res) => {
    try {
        const result = await fastApiController.matchResumes();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to match resumes' });
    }
});

FastApiRouter.post('/upload_video/', upload.single('video'), async (req, res) => {
    try {
        console.log('Uploading video fastapi router:', req.file.path);
        const result = await fastApiController.uploadVideo(req.file.path); // Send file path to FastAPI
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload video' });
    }
});

FastApiRouter.get('/test', fastApiController.test);


module.exports = FastApiRouter;
