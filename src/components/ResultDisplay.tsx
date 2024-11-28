const ResultDisplay = ({ result }: { result: string | null }) => {
  return (
    <div
      className={`overflow-y-auto min-h-80 max-h-80 p-4 bg-gray-100 rounded-md shadow-inner transition-opacity duration-500 ${
        result ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-2">AI Response:</h3>
      <div className="text-gray-800">
        {result || 'No result yet. Generate something!'}
      </div>
    </div>
  )
}

export default ResultDisplay
