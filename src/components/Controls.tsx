interface Props {
  onGenerate: (action?: string) => void
  onToneChange: (v: string) => void
}

const Controls = ({ onGenerate, onToneChange }: Props) => {
  return (
    <div className="mt-4 flex space-x-4 flex-col md:flex-row justify-around items-center h-40 md:h-auto md:justify-start">
      <select
        onChange={(e) => onToneChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="Formal">Formal</option>
        <option value="Casual">Casual</option>
        <option value="Persuasive">Persuasive</option>
      </select>
      <button
        onClick={() => onGenerate()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm transform transition-transform hover:scale-105 hover:bg-blue-700"
      >
        Generate Response
      </button>

      <button
        onClick={() => onGenerate('summarize')}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 shadow-sm"
      >
        Summarize
      </button>
    </div>
  )
}

export default Controls
