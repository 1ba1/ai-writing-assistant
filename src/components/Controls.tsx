interface Props {
  onGenerate: () => void
}

const Controls = ({ onGenerate }: Props) => {
  return (
    <div className="mt-4 flex space-x-4">
      <button
        onClick={onGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm transform transition-transform hover:scale-105 hover:bg-blue-700"
      >
        Generate Response
      </button>

      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 shadow-sm">
        Summarize
      </button>
    </div>
  )
}

export default Controls
