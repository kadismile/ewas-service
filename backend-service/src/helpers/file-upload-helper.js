import multer from 'multer';
import { uuid } from 'uuidv4';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';
import { Attachment } from '../models/AttachmentModel/AttachmentModel.js';
import { Report } from '../models/ReportModel/Report.js';
import { Article } from '../models/ArticleModel/ArticleModel.js';
import Agenda from 'agenda';


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

export const manageFileUpload = async (filePath, fileName, data, model) => {
  try {
    const mongoConnectionString = process.env.MONGODB_URL;
    if (!mongoConnectionString) {
      throw new Error('MONGODB_URL is not defined');
    }

    const agenda = new Agenda({
      db: { 
        address: mongoConnectionString, 
        collection: 'jobCollection',
        options: {
          ssl: true,
          tls: true,
        },
      },
    });

    agenda.define('Upload Images', async (job) => {
      const { filePath, fileName, data, model } = job.attrs.data;
      await uploadToCloudinary({ filePath, fileName, data, model });
    });

    await agenda.start();

    await agenda.schedule('in 20 seconds', 'Upload Images', {
      filePath,
      fileName,
      data,
      model
    });

    console.log('Agenda started and job scheduled');
  } catch (error) {
    console.error('Error:', error);
  }
}

const uploadToCloudinary = async (job) => {
  const { fileName, filePath, data, model } = job
  let Model = model === 'articles' ? Article : model === 'reports' ? Report : undefined
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: fileName,
      resource_type: 'auto',
    });
    const { asset_id, public_id, signature, format, url, secure_url } = result

    const attachment = new Attachment({
      asset_id, public_id, signature, format, url, secure_url,
      report: model === 'reports' ? data._id : undefined,
      article: model === 'articles' ? data._id : undefined
    })
    await attachment.save();

    await Model.findOneAndUpdate(
      { _id: data._id },
      { $push: { attachments: attachment._id } },
    );

    fs.unlinkSync(filePath)
  } catch (error) {
    console.error('Error processing job:', error);
  }
}
