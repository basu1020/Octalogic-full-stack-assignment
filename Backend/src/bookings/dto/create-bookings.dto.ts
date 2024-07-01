import { IsString, IsDate, IsNumber, MinLength, IsDateString } from 'class-validator';

export class CreateCarBookingsDto {
  @IsString()
  @MinLength(3, {
    message: 'Min of 3 characters required for first name',
  })
  firstName: string;

  @IsString()
  @MinLength(3, {
    message: 'Min of 3 characters required for last name',
  })
  lastName: string;

  @IsDateString()
  startDay: Date;

  @IsDateString()
  endDay: Date;

  @IsNumber()
  vehicleId: number;
}



