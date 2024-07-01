import React, { useContext } from 'react'
import DateSelection from './DateSelection';
import { NameDetails } from './NameDetails';
import { VehicleModels } from './VehicleModels';
import { VehicleOptions } from './VehicleOptions';
import { VehicleType } from './VehicleType';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const appContext = useContext(AppContext)

  return (
    <>
      <div className='flex w-full h-full items-center align-middle'>
        {appContext.app.currentPage === 'nameDetails' ? <NameDetails /> : ''}
        {appContext.app.currentPage === 'vehicleOptions' ? <VehicleOptions /> : ''}
        {appContext.app.currentPage === 'vehicleType' ? <VehicleType /> : ''}
        {appContext.app.currentPage === 'vehicleModels' ? <VehicleModels /> : ''}
        {appContext.app.currentPage === 'dateSelection' ? <DateSelection /> : ''}
      </div>
    </>
  )
}

export default Home