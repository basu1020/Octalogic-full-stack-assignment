import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CarBookings } from './entities/bookings.entity';
import { CreateCarBookingsDto } from './dto/create-bookings.dto';
import { UpdateBookingsDto } from './dto/update-bookings.dto';

@Injectable()
export class CarBookingsService {
    constructor(@InjectRepository(CarBookings) private bookingsRepository: Repository<CarBookings>) {}

    async getBookings() {
        const allBookings = await this.bookingsRepository.find()
        return allBookings
    }

    async createBooking(createBookingDto: CreateCarBookingsDto) {
        const vehId = createBookingDto.vehicleId
        const booking = await this.bookingsRepository.findOne({
            where: {
              vehicleId: vehId,
            }
          });

        if(booking){
            throw new HttpException('the particular vehicle is already booked', HttpStatus.BAD_REQUEST)
        }

        const newBooking = await this.bookingsRepository.create(createBookingDto)

        return this.bookingsRepository.save(newBooking)
    }

    async updateBooking(id: number, updateBookingDto: UpdateBookingsDto) {
        const bookingtoUpdate = await this.bookingsRepository.findBy({id})

        return this.bookingsRepository.save({...bookingtoUpdate, ...updateBookingDto})
    }

    async deleteBooking(id: number) {
        const deletedBooking = await this.bookingsRepository.findBy({id})

        return this.bookingsRepository.remove(deletedBooking)
    }
}
