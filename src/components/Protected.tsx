import { useSession } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router'
import Spinner from './Spinner'

const Protected = () => {
  const { isSignedIn, isLoaded } = useSession()
  if (!isLoaded)
    return (
      <div className="h-[100vh] grid place-content-center">
        <Spinner />
      </div>
    )

  return isSignedIn ? <Outlet /> : <Navigate to="/" replace />
}

export default Protected
