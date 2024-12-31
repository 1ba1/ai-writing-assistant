import { useSession } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import ResultDisplay from '../components/ResultDisplay'
import Skeleton from '../components/Skeleton'
import TextEditor from '../components/TextEditor'
import { getCreditsFromEmail } from '../db'
import useCredits from '../hooks/useCredits'

function Assistant() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { session } = useSession()
  const { credits, setCredits } = useCredits()

  useEffect(() => {
    async function getCredits(): Promise<string | void> {
      if (session) {
        try {
          const email = session.user.emailAddresses[0].emailAddress
          const result = await getCreditsFromEmail(email)
          const { credits } = result[0]
          setCredits(credits)
        } catch (err) {
          return err instanceof Error
            ? console.error(err.message)
            : 'An error occurred'
        }
      }
    }

    getCredits()
  }, [session, setCredits])

  return (
    <div className="h-[calc(100vh-52px)] min-w-screen">
      <div className="p-4">
        {!credits && (
          <div className="grid place-content-center text-black">
            You have finished your credits.
          </div>
        )}

        <div className="py-10 px-4 flex items-start justify-around flex-col lg:flex-row">
          <div className="w-full xl:w-2/5 rounded-lg p-3 bg-gray-700 flex flex-col justify-around min-h-[460px] max-h-[460px]">
            <TextEditor
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              setResult={setResult}
            />
          </div>

          <div className="mt-10 lg:mt-0 w-full xl:w-2/5 rounded-lg p-3 bg-gray-700 min-h-[460px] max-h-[460px]">
            {loading ? (
              <Skeleton />
            ) : error ? (
              <div className="bg-gray-800 rounded-sm text-center mt-6 text-red-500">
                {error}
              </div>
            ) : (
              <ResultDisplay
                result={result}
                onClearEditor={() => setResult('')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assistant
