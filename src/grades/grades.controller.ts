import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('grades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
    constructor(private gradesService: GradesService) {}

    // 👨‍🏫 Guru input nilai
    @Post('add')
    @Roles('GURU')
    async addGrade(
        @Req() req,
        @Body() body: { studentId: string; subject: string; value: number },
    ) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.gradesService.addGrade(teacherId, body.studentId, body.subject, body.value);
    }

    // 👨‍🎓 Siswa lihat nilai sendiri
    @Get('me')
    @Roles('SISWA')
    async getMyGrades(@Req() req) {
        return this.gradesService.getGradesByStudent(req.user.studentId || req.user.userId);
    }

    // 👩‍💼 Kepala sekolah lihat semua nilai
    @Get('all')
    @Roles('KEPALA_SEKOLAH')
    async getAllGrades() {
        return this.gradesService.getAllGrades();
    }
    }
