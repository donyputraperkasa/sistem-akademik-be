import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
    constructor(private prisma: PrismaService) {}

    // Kepala sekolah melihat semua guru
    async getAllTeachers() {
        return this.prisma.teacher.findMany({
        include: {
            user: true,
            grades: true,
            attendances: true,
        },
        });
    }

    // Kepala sekolah melihat detail guru
    async getTeacherById(id: string) {
        return this.prisma.teacher.findUnique({
        where: { id },
        include: {
            user: true,
            grades: { include: { student: { include: { user: true } } } },
        },
        });
    }
}
