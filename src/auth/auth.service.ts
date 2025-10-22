import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(identifier: string, password: string) {
        const user = await this.prisma.user.findFirst({
        where: { OR: [{ nisnip: identifier }, { username: identifier }] },
        });
        if (!user) throw new UnauthorizedException('User tidak ditemukan');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Password salah');

        const { password: _, ...result } = user;
        return result;
    }

    async login(data: { nisnip?: string; username?: string; password: string }) {
        const identifier = data.nisnip || data.username;
        if (!identifier) throw new UnauthorizedException('Harus isi NIS/NIG atau username');

        const user = await this.validateUser(identifier, data.password);

        const payload = { sub: user.id, role: user.role, username: user.username };
        return {
        access_token: this.jwtService.sign(payload),
        user,
        };
    }

    // bagian ganti password
    async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('User tidak ditemukan');

        const isOldValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldValid) throw new BadRequestException('Password lama salah');

        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
        });

        return { message: 'Yaaayyyy password berhasil diubah' };
    }
}
