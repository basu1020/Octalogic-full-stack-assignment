import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    VehiclesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST.toString(),
      port: 3306,
      username: process.env.DB_USER.toString(),
      password: process.env.DB_PASSWORD.toString(),
      database: process.env.DB_DATABASE.toString(),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true

    }),
    CarBookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
