import { Body, Controller, Post } from '@nestjs/common';
import type { CreateUserDto } from 'src/user/dto/dto/user.dto';
import type { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService){}

    @Post('register')
    async registerUser(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

}
