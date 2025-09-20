import { SignedIn, SignOutButton, useSession } from '@clerk/clerk-react'
import { LogOutIcon } from 'lucide-react'
import { Outlet, useLocation } from 'react-router'
import useCredits from '../hooks/useCredits'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import { useState } from 'react'

const Layout = () => {
  const { session, isLoaded } = useSession()
  const { pathname } = useLocation()
  const { credits } = useCredits()

  const assistant = pathname === '/assistant'

  const [{ run, steps }, setState] = useState<{ run: boolean; steps: Step[] }>({
    run: false,
    steps: [
      {
        content: 'These are the credits you have left.',
        target: '.credits',
        disableBeacon: true,
      },
      {
        content: 'Click here to log out.',
        target: '.logout',
        disableBeacon: true,
        placement: 'bottom-start',
      },
      {
        content: 'Use the editor to prompt the AI and modify your text.',
        target: '.editor',
        disableBeacon: true,
        placement: 'right',
      },
      {
        content: 'You can select the tone of the AI response.',
        target: '.response-tone',
        disableBeacon: true,
      },
      {
        content: 'You can also ask the AI to summarize your text.',
        target: '.summarize',
        disableBeacon: true,
      },
      {
        content:
          'Finally, you will get your response here. You can also toggle the suggestions button to get inspired.',
        target: '.result-display',
        disableBeacon: true,
        placement: 'left',
      },
    ],
  })

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps })
    }
  }

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        callback={handleJoyrideCallback}
        continuous
        showProgress
        showSkipButton
      />

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

            <div className="credits">
              <strong>Credits:</strong> {credits}
            </div>

            <div title="Sign out" className="logout">
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

      {assistant && isLoaded && credits! > 0 && (
        <section className="p-2 h-24 lg:h-12 bg-gradient-to-r from-red-500 to-indigo-600 flex justify-center items-center text-center">
          Testing Phase: {credits} credits available.
          <button
            className="ml-2 px-2 py-1 bg-white text-black rounded-md"
            onClick={() => setState({ run: true, steps })}
          >
            Start tour
          </button>
        </section>
      )}

      <Outlet />
    </>
  )
}

export default Layout
