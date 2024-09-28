import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { UploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './Auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  //TypeOrmModule.forRoot() se importa antes que otros modulos
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: './.env', // ya no se usa esto para migraciones
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ProductsModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    UploadModule,
    AuthModule,

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // 1 hour
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*   {
      provide: APP_GUARD,
      useClass: AuthGuard, // AuthGuard is imported from @nestjs/passport library
    }, // para pedir el token en todos los lugares
    */
  ],
})
export class AppModule {}

// minuto 13.42
