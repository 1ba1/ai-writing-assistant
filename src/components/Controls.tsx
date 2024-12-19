import { Action } from '../types'

interface Props {
  onGenerate: (action?: Action) => void
  onToneChange: (v: string) => void
  onClearEditor: () => void
}

const Controls = ({ onGenerate, onToneChange, onClearEditor }: Props) => {
  return (
    <div className="mt-4 sm:mt-0 flex-wrap flex flex-col sm:flex-row justify-around sm:items-center space-y-2 xl:space-y-0 xl:h-auto">
      <select
        title="Set the tone for the response"
        onChange={(e) => onToneChange(e.target.value)}
        className="bg-white border-gray-300 text-black px-4 py-2 border-2 rounded-md cursor-pointer"
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
        onClick={() => onGenerate(Action.SUMMARIZE)}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
      >
        Summarize
      </button>

      <button
        onClick={onClearEditor}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Clear Editor
      </button>
    </div>
  )
}

export default Controls
