export class CreateVehiclesDto {
    type: 'hatchback' | 'suv' | 'sedan' | 'cruiser' | 'sports'

    no_of_wheels: 4 | 2

    model: string
}