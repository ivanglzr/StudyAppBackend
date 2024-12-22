import * as path from 'node:path';

import { diskStorage } from 'multer';

import { BadRequestException } from '@nestjs/common';

export const documentsDestination = 'uploads/documents';

const allowedExtensions = [
  '.txt',
  '.md',
  '.csv',
  '.json',
  '.xml',
  '.mdx',
  '.pdf',
];

export const multerStorage = diskStorage({
  destination: documentsDestination,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    if (!allowedExtensions.includes(ext)) {
      return cb(new BadRequestException('Invalid extension'), null);
    }

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});
