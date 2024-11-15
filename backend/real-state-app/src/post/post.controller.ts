import { Body, Controller, Get, Post, Req, UploadedFiles, UseGuards, ValidationPipe } from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtRoleGuard } from "src/auth/jwt.guards";
import { CreatePropertyDto, CreatePublicationDto } from "./post.dto";
import { ResponseInterface } from "src/interfaces";
import { features, GetPropertyResponseInterface, PropertyResponseInterface, PublicationResponseInterface } from "src/interfaces/services/post.interface";



@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
    ){}

    @Get('features')
    public async getFeatures():Promise<ResponseInterface<features[]>>{
        return await this.postService.getFeaturesList()
    }


    @Post('create')
    @UseGuards(JwtRoleGuard)
    public async createProperty(
        @Req() req,
        @Body(new ValidationPipe()) propertyData:CreatePropertyDto
    ):Promise<ResponseInterface<GetPropertyResponseInterface>>{
        
        return await this.postService.createProperty(propertyData, req.user.id)
        
    }

    @Post('create/post')
    @UseGuards(JwtRoleGuard)
    public async createPost(
        @Req() req,
        @Body(new ValidationPipe()) createPostDto:CreatePublicationDto,
        @UploadedFiles() images:Express.Multer.File[],
        @UploadedFiles() videos:Express.Multer.File[]
    ):Promise<ResponseInterface<PublicationResponseInterface>>{
        createPostDto.images = images
        createPostDto.videos = videos
        return this.postService.createPublication(createPostDto)
    }

}