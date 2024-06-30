import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';
import { Vehicles } from '../../vehicles/entities/vehicles.entity';

@Entity()
export class CarBookings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' }) 
  startDay: Date;

  @Column({ type: 'date' }) 
  endDay: Date;

  @Column()
  vehicleId: number;
}