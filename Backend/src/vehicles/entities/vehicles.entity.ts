import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Vehicles {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: 'hatchback' | 'suv' | 'sedan' | 'cruiser' | 'sports'
    
    @Column()
    no_of_wheels: 4 | 2
    
    @Column()
    model: string
}