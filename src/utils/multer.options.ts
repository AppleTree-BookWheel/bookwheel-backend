import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

export const multerOptions: MulterOptions = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const folder = 'uploads';
      const fileName = `${Date.now()}_${file.originalname}`;
      callback(null, `${folder}/${fileName}`);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
};
