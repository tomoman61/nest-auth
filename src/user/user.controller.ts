import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuards } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuards)
    @Get(':id')
    async getUserProfile(@Param('id') id: number) {
        return this.userService.findById(id);
    }
}
