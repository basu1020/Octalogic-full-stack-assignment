import { IsString, IsDate, IsNumber, MinLength } from 'class-validator';

export class CreateCarBookingsDto {
  @IsString() @MinLength(3)
  firstName: string;

  @IsString() @MinLength(3)
  lastName: string;

  @IsDate()
  startDay: Date;

  @IsDate()
  endDay: Date;

  @IsNumber() 
  vehicleId: number;

}



