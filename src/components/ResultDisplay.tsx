const ResultDisplay = ({ result }: { result: string | null }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-inner">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">AI Response:</h3>
      <div className="text-gray-800">
        {result || "No result yet. Generate something!"}
      </div>
    </div>
  )
}

export default ResultDisplay
