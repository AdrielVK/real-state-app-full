import { Role } from './../../node_modules/.prisma/client/index.d';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}


export class UserDto {

    id?: number
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role: string
}

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;
  
    @ApiProperty()
    @IsString()
    phoneNumber: string;

}

export class GoogleAuthDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsString()
    @IsOptional()
    profilePic: string
}

export class GoogleUserDto {
    @IsNotEmpty()
    id:number

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;
  
    @ApiProperty()
    @IsString()
    phoneNumber: string;

}

export class RegisterCollaboratorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    lastname: string;
  
    @ApiProperty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    biography?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    disclaimer?: string;

    @ApiProperty()
    @IsOptional()
    profilePic?: Express.Multer.File

    role:Role = 'COLLABORATOR'
}

export class UpdateProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @IsOptional()
    password?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    @IsOptional()
    lastname?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    biography?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    disclaimer?: string;

    @ApiProperty()
    @IsOptional()
    profilePic?: Express.Multer.File


}

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @IsOptional()
    password?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    @IsOptional()
    lastname?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    biography?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    disclaimer?: string;

    @ApiProperty()
    @IsOptional()
    profilePic?: string


}