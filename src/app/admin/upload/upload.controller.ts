import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import * as XLSX from 'xlsx';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('excel')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
      },
      fileFilter: (req, file, cb) => {
        // 允许的Excel文件类型
        const allowedMimeTypes = [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/csv',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('只支持上传Excel文件'), false);
        }
      },
      // 不使用磁盘存储，使用内存存储
      storage: undefined,
    }),
  )
  uploadExcelFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: string,
  ) {
    if (!file) {
      throw new ApiException('文件上传失败', HttpStatus.BAD_REQUEST);
    }

    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelJsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(excelJsonData);
      if (type === 'mount') {
        return this.uploadService.createMounts(excelJsonData);
      }
    } catch (error) {
      throw new ApiException(
        `Excel解析失败: ${error.message}`,
        HttpStatus.BAD_REQUEST,
        500,
      );
    }
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
      fileFilter: (req, file, cb) => {
        // 允许的文件类型
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/bmp',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('只支持上传图片文件'), false);
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
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
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new ApiException('文件上传失败', HttpStatus.BAD_REQUEST);
    }

    // 返回文件路径和相关信息
    return success('上传成功', {
      path: file.path.replace(/\\/g, '/'),
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
  }
}
