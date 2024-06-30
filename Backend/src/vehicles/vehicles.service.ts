import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Vehicles } from './entities/vehicles.entity';

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(Vehicles) private vehiclesRepository: Repository<Vehicles>) {}
    // fetch all vehicles
    async getVehicles(){
        const res = await this.vehiclesRepository.find()
        return res
    }

    async getDifferentWheelsOptions() {
        const distinctWheels = await this.vehiclesRepository
            .createQueryBuilder()
            .select('DISTINCT no_of_wheels', 'wheels')
            .getRawMany();

        return distinctWheels.map((item) => item.wheels);
    }

    async getVehicleTypesBasedOnNoOfWheels(wheels: 4 | 2) {
        const types = await this.vehiclesRepository
            .createQueryBuilder('vehicles')
            .select('DISTINCT type', 'vehicleType')
            .where('no_of_wheels = :wheels', { wheels })
            .getRawMany();

        return types.map((item) => item.vehicleType);
    }

    async getModelsBasedOnType(type?: 'hatchback' | 'suv' | 'sedan' | 'cruiser' | 'sports'){
        const diffModels = await this.vehiclesRepository.find({
            where: {
                type: type
            }
        })

        return diffModels
    }

}
