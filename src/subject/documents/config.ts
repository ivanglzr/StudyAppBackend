import * as path from 'node:path';

import { diskStorage } from 'multer';

import { BadRequestException } from '@nestjs/common';

const destination = 'src/uploads/documents';

const allowedExtensions = [
  '.txt',
  '.md',
  '.rtf',
  '.csv',
  '.json',
  '.yaml',
  '.xml',
  '.tex',
  '.mdx',
  '.rst',
  '.pdf',
  '.doc',
  '.docx',
  '.odt',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
];

export const multerStorage = diskStorage({
  destination,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    console.log(ext);

    if (!allowedExtensions.includes(ext)) {
      return cb(new BadRequestException('Invalid extension'), null);
    }

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});
