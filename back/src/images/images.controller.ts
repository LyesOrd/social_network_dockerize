import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  findAll() {
    return this.imagesService.findAll();
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
