import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ✅ CORS Setup (penting untuk koneksi FE <-> BE) ---
  app.enableCors({
    origin: 'http://localhost:3000', // FE kamu jalan di port 3000
    credentials: true, // jika nanti pakai cookie / auth
  });

  // --- Swagger Setup ---
  const config = new DocumentBuilder()
    .setTitle('Sistem Akademik API')
    .setDescription('Dokumentasi API Sistem Akademik (Kepala Sekolah, Guru, Siswa)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // --- Jalankan server ---
  await app.listen(4000);
  console.log('🚀 Server running at http://localhost:4000');
  console.log('📘 Swagger docs at http://localhost:4000/api/docs');
}
bootstrap();