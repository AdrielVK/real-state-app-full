import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

import {v2 as cloudinary} from 'cloudinary';


@Injectable()
export class CloudinaryService {

    constructor(private configService: ConfigService){

        cloudinary.config({
            cloud_name:this.configService.get<string>('CLOUDINARY_NAME'),
            api_key:this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret:this.configService.get<string>('CLOUDINARY_API_SECRET')
            
            
        })
    }

    
    async uploadImage(file: Express.Multer.File) {
        return { imageUrl: file.path }; 
    }

    
}
