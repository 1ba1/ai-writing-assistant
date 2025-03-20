import { SignedIn, SignOutButton, useSession } from '@clerk/clerk-react'
import { LogOutIcon } from 'lucide-react'
import { Outlet, useLocation } from 'react-router'
import useCredits from '../hooks/useCredits'

const Layout = () => {
  const { session, isLoaded } = useSession()
  const { pathname } = useLocation()
  const { credits } = useCredits()

  const assistant = pathname === '/assistant'

  return (
    <>
      <header className="bg-gray-700 py-2 flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-white text-left ml-2">
          AI Writing Assistant
        </h1>

        {assistant && isLoaded && (
          <div className="lg:mr-2 mt-6 lg:mt-0 flex flex-col lg:flex-row items-center justify-between lg:w-4/12">
            <div>
              <strong>User:</strong>{' '}
              {session?.user.emailAddresses[0].emailAddress}
            </div>

            <div>
              <strong>Credits:</strong> {credits}
            </div>

            <div title="Sign out">
              <SignedIn>
                <SignOutButton redirectUrl="/">
                  <LogOutIcon
                    color="white"
                    className="hidden lg:block mr-2 cursor-pointer"
                  />
                </SignOutButton>
              </SignedIn>
              <SignedIn>
                <SignOutButton redirectUrl="/">
                  <button className="lg:hidden my-2 px-2 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        )}
      </header>

      {assistant && isLoaded && (
        <section className="p-2 h-24 lg:h-12 bg-gradient-to-r from-red-500 to-indigo-600 flex justify-center items-center text-center">
          Testing Phase: 5 credist available. (Look at the header top-right
          corner to see how many credits you have left)
        </section>
      )}

      <Outlet />
    </>
  )
}

export default Layout
