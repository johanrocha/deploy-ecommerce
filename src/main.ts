import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareGlobal } from './Middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guard';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new DateAdderInterceptor());
  app.use(loggerMiddlewareGlobal);
  app.useGlobalPipes(new ValidationPipe()); // para el uso de los pipes
  // configuracion del swagger
  const options = new DocumentBuilder()
    .setTitle('NestJS Api / Ecommerce FSFT53')
    .setDescription(
      'Proyecto integrador de la especialidad backend del modulo 4',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
