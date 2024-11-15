import { UserRepository } from 'src/auth';
import { Module, Provider } from "@nestjs/common";
import { Prisma } from "./prisma.service";
import { PostRepository } from './post.repository';

const provider:Provider<any>[] = [
    Prisma,
    UserRepository,
    PostRepository
];

@Module({
    providers: [...provider],
    exports: [...provider],
})

export class PrismaModule {}