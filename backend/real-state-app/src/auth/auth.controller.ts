import { storage } from './../cloudinary/images.controller';
import { Body, Controller, Get,  Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterCollaboratorDto, RegisterUserDto, UpdateProfileDto } from "./auth.dto";
import { ResponseInterface } from "src/interfaces";
import { LoginResponseInterface, RegisterResponseInterface } from "src/interfaces/services/user.interface";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "./jwt.guards";
import {FileInterceptor} from '@nestjs/platform-express'
 
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService,
    ){
        
    }

    @Post("logout")
    @UseGuards(JwtAuthGuard)
    logout(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        this.authService.blacklistToken(token);
        return { message: 'Logout exitoso' };
    }

    @Post("login")
    @ApiOperation({summary: 'user login'})
    @ApiResponse({status:201, description:'User logged in successfully'})
    @ApiResponse({status:401, description:'Unauthorized'})
    public async login(@Body(new ValidationPipe()) loginDto:LoginDto): Promise<ResponseInterface<LoginResponseInterface>>{
        return await this.authService.login(loginDto)as Promise<ResponseInterface<LoginResponseInterface>>
    }

    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    public async register(
        @Body(new ValidationPipe()) registerDto: RegisterUserDto
    ): Promise<ResponseInterface<RegisterResponseInterface>> {

        return await this.authService.registerUser(registerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me') 
    getMe(@Req() req) {
        return req.user;  
    }


    @Post('register/collaborator')
    @UseInterceptors(FileInterceptor('file',{storage}))
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async registerCollaborator(
        @UploadedFile() file: Express.Multer.File,
        @Body(new ValidationPipe()) registerDto: RegisterCollaboratorDto
    ):Promise<ResponseInterface<RegisterResponseInterface>> {
        return await this.authService.registerCollaborator(registerDto);   
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/profile/:id')
    @UseInterceptors(FileInterceptor('file', {storage}))
    async updateProfile(
        @Param('id') idUser: string,
        @UploadedFile() file: Express.Multer.File,
        @Body(new ValidationPipe()) updateDto: UpdateProfileDto
    ):Promise<ResponseInterface<RegisterResponseInterface>>{
        const userId = parseInt(idUser, 10)
        
        updateDto.profilePic = file
        return await this.authService.updateUser(updateDto, userId)
    }

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    googleLogin(){}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req, @Res() res,){
        console.log('**********')
        console.log(req.user)
        console.log('**********')
        const response = await this.authService.loginGoogle(req.user)
        res.redirect(`${process.env.FRONTEND_URL}/auth/login?token=${response.payload.access_token}`)
    }
}