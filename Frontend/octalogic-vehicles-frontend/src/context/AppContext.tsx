import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export type App = {
  firstName: string,
  lastName: string,
  wheels: number,
  vehicleType: string,
  model: string,
  startDate: string,
  endDate: string
  currentPage: 'nameDetails' | 'vehicleOptions' | 'vehicleType' | 'vehicleModels' | 'dateSelection'
}

export interface AppContextInterface {
  app: App,
  setApp: Dispatch<SetStateAction<App>>
}

const defaultState = {
  app: {
    firstName: '',
    lastName: '',
    wheels: 0,
    vehicleType: '',
    model: '',
    startDate: '',
    endDate: '',
    currentPage: 'nameDetails'
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setApp: (app: App) => { }
} as AppContextInterface

export const AppContext = createContext(defaultState)

type AppProviderProps = {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  const [app, setApp] = useState<App>({
    firstName: '',
    lastName: '',
    wheels: 0,
    vehicleType: '',
    model: '',
    startDate: '',
    endDate: '',
    currentPage: 'nameDetails'
  });

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
    )
}