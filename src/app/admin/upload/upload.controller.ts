import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<any> {
    console.log(file);
    return null;
    // 获取客户端域名端口
    // const hostname = req.headers['x-forwarded-host'] || req.headers.;
    // const port = req.headers['x-forwarded-port'] || req.socket.localPort;
    // const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    // file.path = `${protocol}://${hostname}:${port}/static${file.path
    //   .replace(/\\/g, '/')
    //   .replace(/upload/g, '')}`;
    // return responseMessage(file);
  }
}
