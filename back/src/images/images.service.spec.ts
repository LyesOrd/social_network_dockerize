import { Test, TestingModule } from '@nestjs/testing';
import { ImagesServiceService } from './images.service';

describe('ImagesServiceService', () => {
  let service: ImagesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesServiceService],
    }).compile();

    service = module.get<ImagesServiceService>(ImagesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
