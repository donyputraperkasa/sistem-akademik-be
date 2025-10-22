import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    // 👨‍🏫 Guru memberi absensi
    @Post('mark')
    @Roles('GURU')
    async mark(
        @Req() req,
        @Body() body: { studentId: string; status: string },
    ) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.attendanceService.markAttendance(teacherId, body.studentId, body.status);
    }

    // 👨‍🎓 Siswa lihat absensi sendiri
    @Get('me')
    @Roles('SISWA')
    async myAttendance(@Req() req) {
        return this.attendanceService.getAttendanceByStudent(req.user.studentId || req.user.userId);
    }

    // 👩‍💼 Kepala sekolah lihat semua absensi
    @Get('all')
    @Roles('KEPALA_SEKOLAH')
    async allAttendance() {
        return this.attendanceService.getAllAttendance();
    }
}
