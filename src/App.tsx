import { useState } from "react"
import Controls from "./components/Controls"
import ResultDisplay from "./components/ResultDisplay"
import TextEditor from "./components/TextEditor"
import Spinner from "./components/Spinner"
import { generateText } from "./services/api"

function App() {
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Input cannot be empty!")
      return
    }
    setLoading(true)
    setError("")
    try {
      // Call OpenAI API with user input as a message
      const aiResponse = await generateText([
        { role: "user", content: inputText },
      ])
      setResult(aiResponse)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        AI Writing Assistant
      </h1>
      <div className="py-10 px-4 flex items-start justify-around">
        <div className="w-2/5">
          <TextEditor onTextChange={setInputText} />
          <Controls onGenerate={handleGenerate} />
        </div>
        <div className="w-2/5">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center mt-6 text-red-500">{error}</div>
          ) : (
            <ResultDisplay result={result} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
