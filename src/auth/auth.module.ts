import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
        secret: process.env.JWT_SECRET || 'supersecret',
        signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
