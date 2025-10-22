import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: { nisnip?: string; username: string; password: string; role: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
        data: {
            nisnip: data.nisnip,
            username: data.username,
            password: hashedPassword,
            role: data.role as any,
        },
        });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(username: string) {
        return this.prisma.user.findUnique({ where: { username } });
    }
}
