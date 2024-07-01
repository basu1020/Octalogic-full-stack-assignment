import './App.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs'
import AppProvider from './context/AppContext'
import Home from './components/Home'

function App() {
  

  return (
    <>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Home/>
        </LocalizationProvider>
      </AppProvider>
    </>
  )
}

export default App
