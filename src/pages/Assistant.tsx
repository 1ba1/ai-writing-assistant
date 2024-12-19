import { SignedIn, SignOutButton } from '@clerk/clerk-react'
import { LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import ResultDisplay from '../components/ResultDisplay'
import Skeleton from '../components/Skeleton'
import TextEditor from '../components/TextEditor'

function Assistant() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="min-h-screen min-w-screen">
      <header className="bg-gray-700 py-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white text-center lg:text-left lg:ml-2">
          AI Writing Assistant
        </h1>
        <div title="Sign out">
          <SignedIn>
            <SignOutButton redirectUrl="/">
              <LogOutIcon color="white" className="mr-2 cursor-pointer" />
            </SignOutButton>
          </SignedIn>
        </div>
      </header>
      <div className="p-4">
        <div className="py-10 px-4 flex items-start justify-around flex-col lg:flex-row">
          <div className="w-full xl:w-2/5 rounded-lg p-3 bg-gray-700 flex flex-col justify-around min-h-[460px] max-h-[460px]">
            <TextEditor
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
