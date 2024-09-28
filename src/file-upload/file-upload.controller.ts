import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('/files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, // bites size
            message: 'El tamaño del archivo excede el permitido',
          }),
          new FileTypeValidator({
            fileType: /jpg|jpeg|png|gif|svg|webp/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
