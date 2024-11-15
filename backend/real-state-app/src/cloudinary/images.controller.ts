import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    
});

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
        return this.imagesService.uploadImage(file); // URL generada por Cloudinary
    }

  
}