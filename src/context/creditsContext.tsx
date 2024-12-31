import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

type DefaultValue = {
  credits: number | undefined
  setCredits: Dispatch<SetStateAction<number | undefined>>
}

const defaultValue: DefaultValue = {
  credits: undefined,
  setCredits: (): void => {
    throw new Error('Function not implemented.')
  },
}

const CreditsContext = createContext(defaultValue)

export const CreditsProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState<number | undefined>()

  return (
    <CreditsContext.Provider value={{ credits, setCredits }}>
      {children}
    </CreditsContext.Provider>
  )
}

export default CreditsContext
