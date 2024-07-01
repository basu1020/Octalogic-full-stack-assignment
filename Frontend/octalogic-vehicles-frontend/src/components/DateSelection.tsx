import { Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const DateSelection = () => {
  const defaultDate = dayjs();
  const [fromDate, setFromDate] = useState(defaultDate)
  const [toDate, setToDate] = useState(defaultDate)
  const { app, setApp } = useContext(AppContext);

  const onChangeFromDate = (newVal: Dayjs | null) => {
    if (newVal) {
      setFromDate(newVal);
      const formattedDate = newVal.format('YYYY-MM-DD');
      setApp({ ...app, startDate: formattedDate });
    }
  }

  const onChangeToDate = (newVal: Dayjs | null) => {
    if (newVal) {
      setToDate(newVal);
      const formattedDate = newVal.format('YYYY-MM-DD');
      setApp({ ...app, endDate: formattedDate })
    }
  }


  const onClickFinalSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (app.startDate === app.endDate) {
      alert("start date and end date can't be same")
      return
    }

    if (dayjs(app.endDate).isBefore(dayjs(app.startDate))) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    const reqBody = {
      firstName: app.firstName,
      lastName: app.lastName,
      startDay: app.startDate,
      endDay: app.endDate,
      vehicleId: Number(app.model)
    }

    try {
        const response = await fetch('http://localhost:3000/bookings', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBody) 
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const res = await response.json();
        console.log(res)
      } catch (error) {
        console.error('Error', error);
      }
  }

  return (
    <>
      <div className='flex flex-col gap-5 m-auto w-1/3'>
        <h2 className='!text-4xl !font-bold !text-blue-800 my-10'>Select Date</h2>
        <DatePicker label='Select From (mm/dd/yyyy)' value={fromDate} onChange={(newValue) => { onChangeFromDate(newValue) }} />
        <DatePicker label='Select To (mm/dd/yyyy)' value={toDate} onChange={(newValue) => { onChangeToDate(newValue) }} />
        <Button variant="contained" onClick={(e) => onClickFinalSubmit(e)}>Submit</Button>
      </div>
    </>
  )
}

export default DateSelection