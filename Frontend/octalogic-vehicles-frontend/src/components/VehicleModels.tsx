import React, { useContext, useEffect, useRef, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AppContext } from '../context/AppContext';
import { Button } from '@mui/material';

type Model = {
  id: number,
  model: string
}

export const VehicleModels = () => {
  const { app, setApp } = useContext(AppContext);
  const [model, setModel] = useState(app.model);
  const [modelOptions, setModelOptions] = useState([]);
  const effectRan = useRef(false);

  const getModelOptions = async () => {
    if(app.vehicleType){
      try {
        const response = await fetch(`http://localhost:3000/vehicles/type/${app.vehicleType}`, {
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
        setModelOptions(res)
      } catch (error) {
        console.error('Error fetching wheels options:', error);
      }
    }
  }

  useEffect(() => {
    if (effectRan.current === false){
      console.log('running');
      getModelOptions()
      return () => { effectRan.current = true} 
    }
  }, [])

  const onClickSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApp({ ...app, model, currentPage: 'dateSelection' });
    console.log(app);
  };

  return (
    <>
      <form className="flex flex-col gap-6 m-auto w-1/3" onSubmit={onClickSubmitButton}>
        <FormControl>
          <FormLabel id="select-model-group-label" className="!text-4xl !font-bold !text-blue-800 my-10">
            Select Model
          </FormLabel>
          <RadioGroup
            aria-labelledby="select-model-group-label"
            name="select-model-radio-buttons-group"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            {modelOptions.map((elem: Model, ind) => {
              return <FormControlLabel value={elem?.id} control={<Radio />} label={elem?.model} key={ind} />
            })}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" type="submit">Next</Button>
      </form>
    </>
  );
};
