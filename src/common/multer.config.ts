// src/common/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

import { extname as getExtname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${uniqueSuffix}${ext}`);
    },
  }),
};

export const multerConfigForImages = {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = getExtname(file.originalname); // Utilisez getExtname ici
        callback(null, `${uniqueSuffix}${fileExt}`);
      },
    }),
    limits: {
      fileSize: 3 * 1024 * 1024, // Limite de taille de fichier en octets (3 Mo)
    },
    fileFilter: (req, file, callback) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extnameValid = allowedTypes.test(getExtname(file.originalname).toLowerCase()); // Utilisez getExtname ici
      const mimetypeValid = allowedTypes.test(file.mimetype);
  
      if (mimetypeValid && extnameValid) {
        return callback(null, true);
      } else {
        return callback(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'));
      }
    },
  };


