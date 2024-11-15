import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { UserRepository } from 'src/database';
import { JwtService } from '@nestjs/jwt';
import { ResponseClass } from "src/config";
import { GoogleAuthDto, LoginDto, RegisterCollaboratorDto, RegisterUserDto, UpdateProfileDto, UpdateUserDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService extends ResponseClass{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly cloudinaryService: CloudinaryService
    ){super();
    }

    private blacklist: Set<string> = new Set();

    blacklistToken(token: string) {
        this.blacklist.add(token);
    }
    
    isBlacklisted(token: string): boolean {
        return this.blacklist.has(token);
    }

    async loginGoogle(googleUser: GoogleAuthDto){
        if (!googleUser) return this.forbidden({message:'No se encontro usuario'})
        let payload = {email: googleUser.email, sub: googleUser.email, name:googleUser.name,lastname:googleUser.lastname, profilePic:googleUser.profilePic};
        return this.success({
            access_token: this.jwtService.sign(payload),
            user:googleUser
        });
    }

    async login(loginDto: LoginDto){
        const user = await this.userRepository.findByEmail(loginDto.email);

        if(!user){
            return this.forbidden({message:'No se encontro usuario con ese email'})
        }

        let passwordValid = await bcrypt.compare(loginDto.password, user.password);

        if (passwordValid){
            let payload = {email: user.email, sub: user.id};
            return this.success({
                access_token: this.jwtService.sign(payload),
                user:user
            });
        }

        return this.forbidden('Credenciales invalidas');
    }

    async registerUser(registerDto: RegisterUserDto) {
        const existingUser = await this.userRepository.findByEmail(registerDto.email);
        if (existingUser) {
            return this.badRequest({ message: 'Usuario existente con ese email' });
        }
    
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        registerDto.password = hashedPassword;

        await this.userRepository.registerUsuario(registerDto);

        let payload = {message:'Usuario creado'}
        return this.success(payload);

    }

    async registerCollaborator(registerDto: RegisterCollaboratorDto) {
        const existingUser = await this.userRepository.findByEmail(registerDto.email);
        
        
        if (existingUser) {
            return this.badRequest('Ya existe una cuenta con ese email');
        }

        let uploadResult:string|null = null;

        if(registerDto.profilePic){
            uploadResult = (await this.cloudinaryService.uploadImage(registerDto.profilePic)).imageUrl;
            
        }
        
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        registerDto.password = hashedPassword;
        registerDto.role = 'COLLABORATOR'
        
        await this.userRepository.registerUsuario(registerDto, uploadResult);

        return this.success({
            message: 'Usuario creado',
        })
    }

    async updateUser(updateDto: UpdateProfileDto, idUser: number) {
        let existingUser = null;
    
        if (updateDto.email) {
            existingUser = await this.userRepository.findByEmail(updateDto.email);
        }
    
        if (existingUser && existingUser.id !== idUser) {
            return this.badRequest('Ya existe una cuenta con ese email');
        }
    
        const newProfile: UpdateUserDto = {};
    
        if (updateDto.disclaimer) newProfile.disclaimer = updateDto.disclaimer;
        if (updateDto.lastname) newProfile.lastname = updateDto.lastname;
        if (updateDto.name) newProfile.name = updateDto.name;
        if (updateDto.email) newProfile.email = updateDto.email;
        if (updateDto.biography) newProfile.biography = updateDto.biography;
    
        if (updateDto.password) {
            const hashedPassword = await bcrypt.hash(updateDto.password, 10);
            newProfile.password = hashedPassword;
        }
    
        if (updateDto.profilePic) {
            const uploadResult = await this.cloudinaryService.uploadImage(updateDto.profilePic);
            newProfile.profilePic = uploadResult.imageUrl; 
        }
    
        await this.userRepository.updateUser(newProfile, idUser);
    
        return this.success({
            message: 'Perfil actualizado',
        });
    }

    
}