import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Like } from './like.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imageRepo: Repository<Image>,
    @InjectRepository(Like) private likeRepo: Repository<Like>,
  ) {}

  async findAll() {
    return this.imageRepo.find();
  }

  async createImage(filename: string, userId: number) {
    const image = this.imageRepo.create({ filename, user: { id: userId } });
    return this.imageRepo.save(image);
  }

  async likeImage(imageId: number, userId: number) {
    const like = await this.likeRepo.findOne({
      where: { image: { id: imageId }, user: { id: userId } },
    });
    if (!like) {
      await this.likeRepo.save({
        image: { id: imageId },
        userId,
        likeStatus: true,
      });
      await this.imageRepo.increment({ id: imageId }, 'likes', 1);
    }
    return this.findAll();
  }

  async saveImage(filename: string, userId: number) {
    const image = this.imageRepo.create({ filename, user: { id: userId } });
    return this.imageRepo.save(image);
  }

  async dislikeImage(imageId: number, userId: number) {
    const like = await this.likeRepo.findOne({
      where: { image: { id: imageId }, user: { id: userId } },
    });
    if (!like) {
      await this.likeRepo.save({
        image: { id: imageId },
        userId,
        likeStatus: false,
      });
      await this.imageRepo.increment({ id: imageId }, 'dislikes', 1);
    }
    return this.findAll();
  }
}
