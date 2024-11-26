import { useState } from "react"
import Controls from "./components/Controls"
import ResultDisplay from "./components/ResultDisplay"
import TextEditor from "./components/TextEditor"

function App() {
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState("")

  const handleGenerate = () => {
    console.log(inputText)
    // Placeholder for API call
    const mockResponse = "This is the AI-generated result based on your input."
    setResult(mockResponse)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto py-10 px-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            AI Writing Assistant
          </h1>
          <TextEditor onTextChange={setInputText} />
          <Controls onGenerate={handleGenerate} />
        </div>
        <div>
          <ResultDisplay result={result} />
        </div>
      </div>
    </div>
  )
}

export default App
