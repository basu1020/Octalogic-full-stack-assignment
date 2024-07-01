import React, { useContext, useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { AppContext } from '../context/AppContext';

export const NameDetails = () => {
  const { app, setApp } = useContext(AppContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onClickSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApp({ ...app, firstName, lastName, currentPage: 'vehicleOptions' });
    console.log(app);
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4 m-auto w-1/3">
        <h2 className="!text-4xl !font-bold !text-blue-800 my-10">First, what's your name</h2>
        <form className="flex flex-col gap-6" onSubmit={(e) => onClickSubmitButton(e)}>
          <TextField
            id="first-name"
            label="First Name"
            variant="standard"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="last-name"
            label="Last Name"
            variant="standard"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button variant="contained" type="submit">Next</Button>
        </form>
      </div>
    </>
  );
};