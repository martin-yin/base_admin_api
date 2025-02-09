// upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';
import { mkdirSync, existsSync } from 'node:fs';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        limits: {
          fileSize: 1024 * 1024 * 1,
        },
        storage: diskStorage({
          destination: (_, file, cb) => {
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
            const filePath = `./public/upload/${temp}`;
            // 判断是否存在，并且创建
            if (!existsSync(filePath)) {
              mkdirSync(filePath, { recursive: true });
            }
            return cb(null, `./${filePath}`);
          },
          filename: (_, file, cb) => {
            // const filename = `${file.mimetype.split('/')[1]}`;
            // console.log(, '===');
            return cb(null, file.originalname);
          },
        }),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
