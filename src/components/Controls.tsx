interface Props {
  onGenerate: (action?: string) => void
  onToneChange: (v: string) => void
}

const Controls = ({ onGenerate, onToneChange }: Props) => {
  return (
    <div className="mt-6 flex-wrap flex flex-col xl:flex-row justify-around xl:items-center space-y-2 xl:space-y-0 h-40 xl:h-auto">
      <select
        onChange={(e) => onToneChange(e.target.value)}
        className="bg-white border-gray-300 text-black px-4 py-2 border-2 rounded-md"
      >
        <option value="Formal">Formal</option>
        <option value="Casual">Casual</option>
        <option value="Persuasive">Persuasive</option>
      </select>

      <button
        onClick={() => onGenerate()}
        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:from-blue-500 hover:to-blue-500"
      >
        Generate Response
      </button>

      <button
        onClick={() => onGenerate('summarize')}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        Summarize
      </button>
    </div>
  )
}

export default Controls
