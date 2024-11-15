import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { ImagesController } from './images.controller';

@Module({
  imports:[ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
  controllers: [ImagesController]
})
export class CloudinaryModule {}
