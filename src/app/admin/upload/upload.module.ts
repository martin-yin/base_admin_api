// upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';
import { mkdirSync, existsSync } from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        limits: {
          fileSize: 1024 * 1024 * 5,
        },
        storage: diskStorage({
          destination: (req, file, cb) => {
            console.log(req);
            const allowedImageTypes = [
              'gif',
              'png',
              'jpg',
              'jpeg',
              'bmp',
              'webp',
            ];
            const fileExtension = file.originalname
              .split('.')
              .pop()
              .toLowerCase();
            let temp = 'other';
            if (allowedImageTypes.includes(fileExtension)) {
              temp = 'image';
            }
            const filePath = `./upload/${temp}`;
            // 判断是否存在，并且创建
            if (!existsSync(filePath)) {
              mkdirSync(filePath, { recursive: true });
            }
            return cb(null, `./${filePath}`);
          },
          filename: (_, file, cb) => {
            return cb(null, `${uuidv4()}-${file.originalname}`);
          },
        }),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
