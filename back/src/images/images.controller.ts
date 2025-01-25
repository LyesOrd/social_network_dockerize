import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Post,
  Request,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.imagesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createImage(@Body() body: { url: string }, @Request() req: any) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    return this.imagesService.createImage(body.url, userId);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: any, @Request() req: any) {
    console.log(file, 'file');
    console.log(req.user, 'req');
    const userId = req.user?.id; // Vérification que req.user existe
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.imagesService.saveImage(file.filename, userId);
  }
  @Put(':id/like')
  like(@Param('id') id: number, @Body('userId') userId: number) {
    return this.imagesService.likeImage(id, userId);
  }

  @Put(':id/dislike')
  dislike(@Param('id') id: number, @Body('userId') userId: number) {
    return this.imagesService.dislikeImage(id, userId);
  }
}
