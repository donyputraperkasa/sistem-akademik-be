import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeachersController {
    constructor(private teachersService: TeachersService) {}

    // 🧑‍💼 Kepala sekolah lihat semua guru
    @Get()
    @Roles('KEPALA_SEKOLAH')
    async getAllTeachers() {
        return this.teachersService.getAllTeachers();
    }

    // 🧑‍💼 Kepala sekolah lihat detail guru
    @Get(':id')
    @Roles('KEPALA_SEKOLAH')
    async getTeacher(@Param('id') id: string) {
        return this.teachersService.getTeacherById(id);
    }
}
