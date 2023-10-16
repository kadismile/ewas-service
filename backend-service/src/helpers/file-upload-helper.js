import kue from 'kue';
import multer from 'multer';
import { uuid } from 'uuidv4';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';
import { Report } from '../models/ReportModel/Report.js';
import { Attachment } from '../models/AttachmentModel/AttachmentModel.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname));
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuid() + '-' + fileName)
  },
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" || 
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif" ||
        file.mimetype == "video/mp4" ||
        file.mimetype == "video/webm" ||
        file.mimetype == "video/ogg"
      ) {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('file format not allowed!'));
      }
    }
});

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const manageFileUpload = async (filePath, fileName, report) => {
  const queues = kue.createQueue();
  const type = 'uploadFile';
  queues
    .create(type)
    .priority('high')
    .save()
  
  const queue = kue.createQueue({
      redis: process.env.REDIS_URL
  });  
  queue.process(type, async function (job, done) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: fileName,
        resource_type: 'auto',
      
      });
      fs.unlinkSync(filePath)
      done(null, result);
    } catch (error) {
      console.error('Error processing job:', error);
      done(error);
    }
  });

  queue.on('job complete', async function (id, result) {

    const { asset_id, public_id, signature, format, url, secure_url } = result
    const attachment = new Attachment({
      asset_id,public_id,signature,format,url,secure_url,
      report: report._id
    })
    await attachment.save();
    console.log(`Job ${id} saving attachment to DB:`, signature);
    report.attachments.push(attachment._id)
    await report.save();

  });
}

