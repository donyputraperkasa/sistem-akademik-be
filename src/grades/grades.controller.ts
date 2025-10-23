import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('grades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
    constructor(private gradesService: GradesService) {}

    // 👨‍🏫 Guru lihat semua nilai yang dia buat
    @Get()
    @Roles('GURU')
    async getByTeacher(@Req() req) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.gradesService.getGradesByTeacher(teacherId);
    }

    // 👨‍🏫 Guru menambahkan nilai
    @Post('create')
    @Roles('GURU')
    async create(@Req() req, @Body() body: { studentId: string; subject: string; value: number }) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.gradesService.createGrade(teacherId, body.studentId, body.subject, body.value);
    }

    // 👨‍🎓 Siswa melihat nilai mereka sendiri
    @Get('me')
    @Roles('SISWA')
    async getMyGrades(@Req() req) {
        const studentId = req.user.studentId || req.user.userId;
        return this.gradesService.getGradesByStudent(studentId);
    }

    // 🧑‍💼 Kepala sekolah melihat semua nilai
    @Get('all')
    @Roles('KEPALA_SEKOLAH')
    async getAll() {
        return this.gradesService.getAllGrades();
    }
}