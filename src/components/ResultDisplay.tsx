import { downloadWordFile } from '../utils/downloadWordFile'

const ResultDisplay = ({ result }: { result: string | null }) => {
  return (
    <>
      <div
        className={`mt-6 md:mt-0 overflow-y-auto min-h-80 max-h-80 p-4 bg-gray-100 rounded-md shadow-inner transition-opacity duration-500 ${
          result ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          AI Response:
        </h3>
        <div className="text-gray-800">
          {result || 'No result yet. Generate something!'}
        </div>
      </div>
      {result && (
        <button
          className="mt-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-1"
          onClick={() => downloadWordFile(result)}
        >
          Download as Word
        </button>
      )}
    </>
  )
}

export default ResultDisplay
