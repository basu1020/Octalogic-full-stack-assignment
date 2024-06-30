import { Module } from '@nestjs/common';
import { CarBookingsController } from './bookings.controller';
import { CarBookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBookings } from './entities/bookings.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CarBookings])],
  controllers: [CarBookingsController],
  providers: [CarBookingsService]
})
export class CarBookingsModule {}
