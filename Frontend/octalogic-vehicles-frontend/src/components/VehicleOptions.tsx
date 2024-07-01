import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';

export const VehicleOptions = () => {
  const { app, setApp } = useContext(AppContext);
  const [wheels, setWheels] = useState(app.wheels);
  const [wheelsOptions, setWheelsOptions] = useState([]);
  const effectRan = useRef(false)
  const [error, setError] = useState<string>('')

  const gettingWheelsOptions = async () => {
    try {
      const response = await fetch('http://localhost:3000/vehicles/wheels-options', {
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
      setWheelsOptions(res)
    } catch (error) {
      console.error('Error fetching wheels options:', error);
    }
  }

  useEffect(() => {
    if (effectRan.current === false){
      gettingWheelsOptions()
      return () => { effectRan.current = true} 
    }
  }, [])

  useEffect(() => {
  }, [error])

  const onClickSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(wheels === 0){
      setError('Please select one option')
      return
    } else {
      setError('')
    }
    setApp({ ...app, wheels, currentPage: 'vehicleType' });
  };

  return (
    <>
      <form className="flex flex-col gap-6 m-auto w-1/3" onSubmit={onClickSubmitButton}>
        <FormControl>
          <FormLabel id="wheels-group-label" className="!text-4xl !font-bold !text-blue-800 my-10">
            Number of Wheels
          </FormLabel>
          <RadioGroup
            aria-labelledby="wheels-buttons-group-label"
            name="wheels-buttons-group"
            value={wheels}
            onChange={(e) => setWheels(Number(e.target.value))}
          >
            {wheelsOptions.map((elem, ind) => {
            return <FormControlLabel value={elem} control={<Radio />} key={ind} label={`${elem}`} /> 
            })}
          </RadioGroup>
            {error !== '' ? <p className='text-red-500'>{error}</p> : ''}
          <Button variant="contained" type="submit">Next</Button>
        </FormControl>
      </form>
    </>
  );
};
