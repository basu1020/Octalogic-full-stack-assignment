import { Body, Controller, Get, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {}

    @Get()
    getVehicles(){
        return this.vehiclesService.getVehicles()
    }

    @Get("/wheels-options")
    getDifferentWheelsOptions(){
        return this.vehiclesService.getDifferentWheelsOptions()
    }

    @Get("/wheels/:wheels")
    getVehicleTypesBasedOnNoOfVehicles(@Param('wheels', ParseIntPipe) wheels: 4 | 2) {
        if(wheels !== 4 &&  wheels !== 2){
            throw new HttpException('wheels can only be 4 or 2', HttpStatus.BAD_REQUEST)
        }
        return this.vehiclesService.getVehicleTypesBasedOnNoOfWheels(wheels)
    }

    @Get("/type/:type")
    getModelsBasedOnType(@Param('type') type: 'hatchback' | 'suv' | 'sedan' | 'cruiser' | 'sports'){
        if(type !== 'hatchback' && type !== 'suv' && type !== 'sedan' && type !== 'cruiser' && type !== 'sports'){
            throw new HttpException('type can only be hatchback, suv, sedan, cruiser or sports', HttpStatus.BAD_REQUEST)
        }
        return this.vehiclesService.getModelsBasedOnType(type)
    }

}
