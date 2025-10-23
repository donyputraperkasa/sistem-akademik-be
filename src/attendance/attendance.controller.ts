import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    // 👨‍🏫 Guru lihat absensi yang dia buat (FE pakai ini)
    @Get()
    @Roles('GURU')
    async getAll(@Req() req) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.attendanceService.getAttendanceByTeacher(teacherId);
    }

    // 👨‍🏫 Guru menandai absensi
    @Post('mark')
    @Roles('GURU')
    async mark(@Req() req, @Body() body: { studentId: string; status: string }) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.attendanceService.markAttendance(teacherId, body.studentId, body.status);
    }

    // 👨‍🎓 Siswa lihat absensi mereka sendiri
    @Get('me')
    @Roles('SISWA')
    async myAttendance(@Req() req) {
        const studentId = req.user.studentId || req.user.userId;
        return this.attendanceService.getAttendanceByStudent(studentId);
    }

    // 🧑‍💼 Kepala sekolah lihat seluruh absensi
    @Get('all')
    @Roles('KEPALA_SEKOLAH')
    async allAttendance() {
        return this.attendanceService.getAllAttendance();
    }
}