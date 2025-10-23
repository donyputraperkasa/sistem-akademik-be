import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttendanceStatus } from '@prisma/client'; // ✅ Import enum langsung dari Prisma Client

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) {}

    // 👨‍🏫 Guru menandai absensi siswa
    async markAttendance(teacherId: string, studentId: string, status: string) {
        // konversi string ke enum
        const enumStatus =
        status === 'HADIR' ? AttendanceStatus.HADIR : AttendanceStatus.TIDAK_HADIR;

        return this.prisma.attendance.create({
        data: {
            teacherId,
            studentId,
            status: enumStatus,
        },
        });
    }

    // 👨‍🏫 Guru melihat semua absensi yang dia buat
    async getAttendanceByTeacher(teacherId: string) {
        return this.prisma.attendance.findMany({
        where: { teacherId },
        include: {
            student: { include: { user: true } },
        },
        orderBy: { date: 'desc' }, // ✅ pakai field "date" bukan "createdAt"
        });
    }

    // 👨‍🎓 Siswa melihat absensi mereka sendiri
    async getAttendanceByStudent(studentId: string) {
        return this.prisma.attendance.findMany({
        where: { studentId },
        include: {
            teacher: { include: { user: true } },
        },
        orderBy: { date: 'desc' }, // ✅ fix
        });
    }

    // 🧑‍💼 Kepala sekolah melihat seluruh absensi
    async getAllAttendance() {
        return this.prisma.attendance.findMany({
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
        },
        orderBy: { date: 'desc' }, // ✅ fix
        });
    }
}