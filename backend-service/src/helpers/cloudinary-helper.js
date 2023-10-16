import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'kadismile', 
  api_key: '628663996444748', 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const manageFileUpload = async (req) => {
  const filePath = req.file.path
  let uploaderError, uploaderResults;
  await cloudinary.uploader.upload(
    req.file.path,
    { public_id: req.filename },
    (error, result) => {
      if (!error) {
        uploaderResults = result
        fs.unlinkSync(filePath); 
      } else {
        uploaderError = error
      }
  });
  
  if (uploaderError) {
    return uploaderError
  }
  return uploaderResults
}
