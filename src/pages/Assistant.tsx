import { useSession } from '@clerk/clerk-react'
import { MouseEvent, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import ResultDisplay from '../components/ResultDisplay'
import Skeleton from '../components/Skeleton'
import TextEditor from '../components/TextEditor'
import { getCreditsFromEmail } from '../db'
import useCredits from '../hooks/useCredits'
import suggestions from '../data/suggestions'

interface DragEvent<T = Element> extends MouseEvent<T> {
  dataTransfer: DataTransfer
}

function Assistant() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [copiedSuggestion, setCopiedSuggestion] = useState<string | null>(null)

  const { session } = useSession()
  const { credits, setCredits } = useCredits()

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    const text = (e.target as HTMLDivElement).innerText
    e.dataTransfer?.setData('text', text)
  }

  async function copyToClipboard(suggestion: string) {
    if ('clipboard' in navigator && suggestion) {
      await navigator.clipboard.writeText(suggestion)
      setCopiedSuggestion(suggestion)
      setTimeout(() => setCopiedSuggestion(null), 5000)
    }
  }

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
        {credits === 0 && (
          <div className="grid place-content-center text-black">
            You have finished your credits.
          </div>
        )}

        <div className="py-10 px-4 flex items-start justify-around flex-col lg:flex-row">
          <div className="editor w-full xl:w-2/5 rounded-lg p-3 bg-gray-700 flex flex-col justify-around min-h-[460px] max-h-[460px]">
            <TextEditor
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              setResult={setResult}
            />
          </div>

          <div className="result-display mt-10 lg:mt-0 w-full xl:w-2/5 rounded-lg p-3 bg-gray-700 min-h-[460px] max-h-[460px]">
            {loading ? (
              <Skeleton />
            ) : error ? (
              <div className="bg-gray-800 rounded-sm text-center mt-6 text-red-500">
                {error}
              </div>
            ) : (
              <>
                <ResultDisplay
                  result={result}
                  onClearEditor={() => setResult('')}
                />

                {!result && (
                  <div className="flex items-center">
                    <button
                      onClick={() => setShowSuggestions((prev) => !prev)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:from-blue-500 hover:to-blue-500`"
                    >
                      {showSuggestions
                        ? 'Hide Suggestions'
                        : 'Show Suggestions'}
                    </button>

                    {showSuggestions && (
                      <>
                        <p className="ml-2 text-white hidden lg:block">
                          Drag and drop suggestions over to the editor
                        </p>
                        <p className="lg:hidden text-white ml-2">
                          Tap to copy suggestion
                        </p>
                      </>
                    )}
                  </div>
                )}

                {showSuggestions && !result && (
                  <div className="mt-2 h-96 overflow-auto flex-col justify-around">
                    {suggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg text-black mt-2 p-4 lg:cursor-grab min-h-20 flex justify-center items-center"
                        draggable
                        onDragStart={onDragStart}
                        onClick={() => copyToClipboard(suggestion)}
                      >
                        {copiedSuggestion === suggestion ? (
                          <Check />
                        ) : (
                          suggestion
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assistant
