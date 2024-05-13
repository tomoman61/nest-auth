import { ConflictException, Injectable } from '@nestjs/common';
import type { PrimsaService } from 'src/prisma.service';
import type { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrimsaService){}

    async create(dto: CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        if(user) throw new ConflictException("emailが重複しています");

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10),
            }
        })

        const { password, ...result } = newUser;
        return result;
    }
}
