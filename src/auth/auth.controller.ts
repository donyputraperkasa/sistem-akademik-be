import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth') // tampil sebagai grup di Swagger
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            username: { type: 'string', example: 'kepsek' },
            password: { type: 'string', example: 'admin123' },
        },
        },
    })
    @ApiResponse({ status: 201, description: 'Login sukses, mengembalikan JWT token.' })
    @ApiResponse({ status: 401, description: 'Username atau password salah.' })
    async login(@Body() body: any) {
        return this.authService.login({
            username: body.username,
            password: body.password,
        });
    }
}
