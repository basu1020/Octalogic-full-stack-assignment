import React, { useContext, useEffect, useRef, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AppContext } from '../context/AppContext';
import { Button } from '@mui/material';

export const VehicleType = () => {
  const { app, setApp } = useContext(AppContext);
  const [vehicleType, setVehicleType] = useState(app.vehicleType);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const effectRan = useRef(false); 

  const getVehiclesTypeOptions = async() => {
    if(app.wheels === 2 || app.wheels === 4){
      try {
        const response = await fetch(`http://localhost:3000/vehicles/wheels/${app.wheels}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const res = await response.json();
        console.log(res)
        setVehicleTypeOptions(res)
      } catch (error) {
        console.error('Error fetching wheels options:', error);
      }
    }
  }

  useEffect(() => {
    if (effectRan.current === false){
      console.log('running');
      getVehiclesTypeOptions()
      return () => { effectRan.current = true} 
    }
  }, [])

  const onClickSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApp({ ...app, vehicleType, currentPage: 'vehicleModels' });
    console.log(app);
  };

  return (
    <>
      <form className="flex flex-col gap-5 m-auto w-1/3" onSubmit={onClickSubmitButton}>
        <FormControl>
          <FormLabel id="type-of-vehicle-group-label" className="!text-4xl !font-bold !text-blue-800 my-10">
            Type of Vehicle
          </FormLabel>
          <RadioGroup
            aria-labelledby="type-of-vehicle-group-label"
            name="type-of-vehicle-buttons-group"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            
            {vehicleTypeOptions.map((elem, ind) => {
              return <FormControlLabel value={elem} control={<Radio />} label={elem} key={ind} />
            })}
            
          </RadioGroup>
        </FormControl>
        <Button variant="contained" type="submit">Next</Button>
      </form>
    </>
  );
};
