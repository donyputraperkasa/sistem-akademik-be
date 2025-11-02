import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    // 🧑‍🏫 GURU melihat siswa yang dia ajar
    @Get('by-teacher')
    @Roles(Role.GURU)
    async getStudentsByTeacher(@Req() req) {
        const teacherId = req.user.id;
        return this.studentsService.getStudentsByTeacher(teacherId);
    }

    // 🧑‍💼 Kepala sekolah melihat semua siswa
    @Get()
    @Roles(Role.KEPALA_SEKOLAH)
    async getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    // Kepala sekolah lihat detail siswa
    @Get(':id')
    @Roles(Role.KEPALA_SEKOLAH)
    async getStudentById(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }
}