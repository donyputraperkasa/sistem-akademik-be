import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dev: izinkan semua origin agar tidak ribet dengan IP/CORS
  app.enableCors({
    origin: true, // menerima semua origin (dev only)
    methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Sistem Akademik API')
    .setDescription('Dokumentasi API Sistem Akademik')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, { swaggerOptions: { persistAuthorization: true }});
  console.log('📘 Swagger UI available at: http://localhost:4000/api/docs');

  // listen di 0.0.0.0 supaya bisa diakses lewat LAN IP
  await app.listen(4000, '0.0.0.0');
  const port = process.env.PORT || 4000;
  const networkInterfaces = os.networkInterfaces();
  const localIp = Object.values(networkInterfaces)
    .flat()
    .find((iface) => iface && iface.family === 'IPv4' && !iface.internal)?.address;

  console.log(`📘 Swagger UI (Local): http://localhost:${port}/api/docs`);
  if (localIp) console.log(`🌐 Swagger UI (LAN): http://${localIp}:${port}/api/docs`);
  console.log(`🚀 Server running at http://0.0.0.0:${port}`);
}
bootstrap();