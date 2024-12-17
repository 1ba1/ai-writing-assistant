import { useState } from 'react'
import { downloadWordFile } from '../utils/downloadWordFile'
import { Check, Copy } from 'lucide-react'

const ResultDisplay = ({ result }: { result: string | null }) => {
  const [copied, setCopied] = useState(false)

  async function copyToClipboard() {
    if ('clipboard' in navigator && result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 5000)
    }
  }

  if (!result) return null

  return (
    <div className="flex flex-col justify-around h-[435px]">
      <div className="relative p-2 min-h-[358px] max-h-[358px] overflow-y-auto bg-gray-100 rounded-md shadow-inner transition-opacity duration-500">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          AI Response:
        </h3>
        <div className="absolute top-2 right-2 cursor-pointer">
          {copied ? (
            <Check color="black" />
          ) : (
            <Copy color="black" onClick={copyToClipboard} />
          )}
        </div>
        <article className="text-gray-800">{result}</article>
      </div>
      <div className="text-center">
        <button
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:from-blue-500 hover:to-blue-500"
          onClick={() => downloadWordFile(result)}
        >
          Download as Word
        </button>
      </div>
    </div>
  )
}

export default ResultDisplay
