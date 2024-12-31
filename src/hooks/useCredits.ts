import { useContext } from 'react'
import CreditsContext from '../context/creditsContext'

const useCredits = () => {
  return useContext(CreditsContext)
}

export default useCredits
