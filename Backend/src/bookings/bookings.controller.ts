import {
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { CarBookingsService } from './bookings.service';
import { CreateCarBookingsDto } from './dto/create-bookings.dto';
import { UpdateBookingsDto } from './dto/update-bookings.dto';

@Controller('bookings')
export class CarBookingsController {
  constructor(private readonly bookingService: CarBookingsService) {}

  @Get()
  getBookings() {
    return this.bookingService.getBookings();
  }

  @Post()
  createBooking(@Body() createBookingDto: CreateCarBookingsDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Put(':id')
  updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingsDto,
  ) {
    return this.bookingService.updateBooking(+id, updateBookingDto);
  }

  @Delete(':id')
  deleteBooking(@Param('id') id: string) {
    return this.bookingService.deleteBooking(+id);
  }
}
