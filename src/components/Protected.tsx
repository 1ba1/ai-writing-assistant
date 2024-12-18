import { useSession } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router'

const Protected = () => {
  const { isSignedIn } = useSession()

  return isSignedIn ? <Outlet /> : <Navigate to="/" replace />
}

export default Protected
