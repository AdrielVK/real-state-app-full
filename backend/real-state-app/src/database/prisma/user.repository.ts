import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from './prisma.service';
import { RegisterUserDto, UpdateProfileDto, UpdateUserDto } from 'src/auth';


@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id:number){
        return this.prisma.user.findUnique({where:{id}})
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async registerUsuario(data: RegisterUserDto, profilePic?:string) {
        return this.prisma.user.create({
            data: {
                ...data,
                profilePic,
            },
        });
    }

    async updateUser(updateDto:UpdateUserDto, idUser:number){
        return this.prisma.user.update({
            where:{id:idUser},
            data: {
                ...updateDto,  
            },
        }
        )
        
    }
}