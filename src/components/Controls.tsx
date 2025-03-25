import { Action } from '../types'

type Props = {
  onGenerate: (action?: Action) => void
  onToneChange: (v: string) => void
  onClearEditor: () => void
  buttonsDisabled: boolean
}

const Controls = ({
  onGenerate,
  onToneChange,
  onClearEditor,
  buttonsDisabled,
}: Props) => {
  return (
    <div className="2xl:mt-0 lg:mt-4 sm:mt-0 flex-wrap flex flex-col gap-4 sm:flex-row justify-around sm:items-center space-y-2 xl:space-y-0 xl:h-auto">
      <select
        title={buttonsDisabled ? '' : 'Set the tone for the response'}
        onChange={(e) => onToneChange(e.target.value)}
        className={`response-tone ${
          buttonsDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
        } mt-2 xl:mt-0 px-4 py-[6.5px] bg-white border-gray-300 text-black border-1 rounded-md`}
        disabled={buttonsDisabled}
      >
        <option value="Formal">Formal</option>
        <option value="Casual">Casual</option>
        <option value="Persuasive">Persuasive</option>
      </select>

      <button
        onClick={() => onGenerate()}
        className={`${
          buttonsDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:from-blue-500 hover:to-blue-500'
        } px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md`}
        disabled={buttonsDisabled}
      >
        Generate Response
      </button>

      <button
        onClick={() => onGenerate(Action.SUMMARIZE)}
        className={`summarize ${
          buttonsDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-500'
        } px-4 py-2 bg-gray-600 text-white rounded-md`}
        disabled={buttonsDisabled}
      >
        Summarize
      </button>

      <button
        onClick={onClearEditor}
        className={`${
          buttonsDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
        } px-4 py-2 bg-red-500 text-white rounded-md`}
        disabled={buttonsDisabled}
      >
        Clear Editor
      </button>
    </div>
  )
}

export default Controls
