import { useState } from 'react'
import Controls from '../components/Controls'
import ResultDisplay from '../components/ResultDisplay'
import TextEditor from '../components/TextEditor'
import { generateText } from '../services/api'
import Skeleton from '../components/Skeleton'
import { SignedIn, SignOutButton } from '@clerk/clerk-react'
import { LogOutIcon } from 'lucide-react'

function Assistant() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tone, setTone] = useState('Formal')

  const handleToneChange = (selectedTone: string) => {
    setTone(selectedTone)
  }

  const handleGenerate = async (action?: string) => {
    if (!inputText.trim()) {
      setError('Input cannot be empty!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const prompt =
        action === 'summarize'
          ? `Summarize the following text:\n\n${inputText}`
          : `Respond in a ${tone} tone:\n\n${inputText}`
      const aiResponse = await generateText([{ role: 'user', content: prompt }])
      setResult(aiResponse)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen min-w-screen">
      <header className="bg-gray-700 py-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white text-center lg:text-left lg:ml-2">
          AI Writing Assistant
        </h1>
        <SignedIn>
          <SignOutButton redirectUrl="/">
            <LogOutIcon color="white" className="mr-2 cursor-pointer" />
          </SignOutButton>
        </SignedIn>
      </header>
      <div className="p-4">
        <div className="py-10 px-4 flex items-start justify-around flex-col lg:flex-row">
          <div className="w-full xl:w-2/5 rounded-lg p-3 bg-gray-700 flex flex-col justify-around min-h-[460px] max-h-[460px]">
            <TextEditor onTextChange={setInputText} />
            <Controls
              onGenerate={handleGenerate}
              onToneChange={handleToneChange}
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
              <ResultDisplay result={result} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assistant
