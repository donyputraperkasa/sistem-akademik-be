import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    // 🧑‍💼 Kepala sekolah melihat semua user
    @Get()
    @Roles('KEPALA_SEKOLAH')
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    // 👨‍🏫👨‍🎓 Semua user melihat profilnya sendiri
    @Get('me')
    @Roles('GURU', 'SISWA', 'KEPALA_SEKOLAH')
    async getProfile(@Req() req) {
        return this.usersService.getProfile(req.user.userId);
    }
}