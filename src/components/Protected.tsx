import { useSession } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router'
import Spinner from './Spinner'
import { useEffect } from 'react'
import { createUser } from '../db'

const Protected = () => {
  const { isSignedIn, isLoaded, session } = useSession()

  useEffect(() => {
    if (session && isLoaded) {
      const email = session.user.emailAddresses[0].emailAddress
      createUser(email)
    }
  }, [session, isLoaded])

  if (!isLoaded)
    return (
      <div className="h-dvh grid place-content-center">
        <Spinner />
      </div>
    )

  return isSignedIn ? <Outlet /> : <Navigate to="/" replace />
}

export default Protected
