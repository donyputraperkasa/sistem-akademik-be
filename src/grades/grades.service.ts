import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradesService {
    constructor(private prisma: PrismaService) {}

    // 👨‍🏫 Guru menambahkan nilai ke siswa
    async createGrade(teacherId: string, studentId: string, subject: string, value: number) {
        return this.prisma.grade.create({
        data: {
            teacherId,
            studentId,
            subject,
            value,
        },
        });
    }

    // 👨‍🏫 Guru melihat semua nilai yang dia buat
    async getGradesByTeacher(teacherId: string) {
        return this.prisma.grade.findMany({
        where: { teacherId },
        include: {
            student: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    // 👨‍🎓 Siswa melihat nilai mereka sendiri
    async getGradesByStudent(studentId: string) {
        return this.prisma.grade.findMany({
        where: { studentId },
        include: {
            teacher: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    // 🧑‍💼 Kepala sekolah melihat semua nilai
    async getAllGrades() {
        return this.prisma.grade.findMany({
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }
}