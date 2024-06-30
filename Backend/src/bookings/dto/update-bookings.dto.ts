import {PartialType} from '@nestjs/mapped-types'
import { CreateCarBookingsDto } from './create-bookings.dto'
import { IsOptional, IsDate, IsString, IsNumber } from 'class-validator'

export class UpdateBookingsDto extends PartialType(CreateCarBookingsDto){
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsDate()
    startDay?: Date;
  
    @IsOptional()
    @IsDate()
    endDay?: Date;
  
    @IsOptional()
    @IsNumber()
    vehicleId?: number;

}







