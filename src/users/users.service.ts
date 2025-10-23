import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany({
        include: {
            teacher: true,
            student: true,
        },
        });
    }

    async getProfile(userId: string) {
        return this.prisma.user.findUnique({
        where: { id: userId },
        include: {
            teacher: true,
            student: true,
        },
        });
    }
}