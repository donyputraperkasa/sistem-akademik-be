import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttendanceStatus } from '@prisma/client';

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) {}

    // 👨‍🏫 Guru memberi absensi
    async markAttendance(teacherId: string, studentId: string, status: string) {
        return this.prisma.attendance.create({
        data: {
            status: status as AttendanceStatus,
            teacherId,
            studentId,
        },
        });
    }

    // 👨‍🎓 Siswa lihat absensinya
    async getAttendanceByStudent(studentId: string) {
        return this.prisma.attendance.findMany({
        where: { studentId },
        include: {
            teacher: { include: { user: true } },
        },
        });
    }

    // 👩‍💼 Kepala sekolah lihat seluruh absensi
    async getAllAttendance() {
        return this.prisma.attendance.findMany({
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
        },
        });
    }
}
