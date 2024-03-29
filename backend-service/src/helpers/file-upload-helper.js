import multer from 'multer';
import  Queue from 'bull';
import { uuid } from 'uuidv4';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';
import { Attachment } from '../models/AttachmentModel/AttachmentModel.js';
import { queueHelper } from '../helpers/queue-helper.js';


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

export const manageFileUpload = async (filePath, fileName, data, Model) => {
  const type = 'uploadFile'; 
  let queue = queueHelper(type, 'high')
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
      asset_id, public_id, signature, format, url, secure_url,
      report: Model.collection.name === 'reports' ? data._id : undefined,
      article: Model.collection.name === 'articles' ? data._id : undefined
    })
    await attachment.save();
    console.log(`Job ${id} saving attachment to DB:`, signature);
      await Model.findOneAndUpdate(
        { _id: data._id },
        { $push: { attachments: attachment._id } },
      );
  }); 
}

