import { Props } from './Props'

const PasswordForm = ({ checks, handlers }: Props) => {
  const { handleChecks, handleClick, handleLength } = handlers

  const checkboxes = [
    { id: 'lowercase', label: 'Lowercase' },
    { id: 'uppercase', label: 'Uppercase' },
    { id: 'numbers', label: 'Numbers' },
    { id: 'symbols', label: 'Symbols' },
    { id: 'pronounceable', label: 'Pronounceable' },
  ] as const

  return (
    <div id="password" className="rounded-lg  flex flex-col">
      {/* <motion.form
      id="password"
      className="flex flex-col w-[305px]"
      initial={{ x: 40 }}
      animate={{ x: 0 }}
    > */}
      {/* <div className="bg-gray-50  border-gray-200 rounded-lg mb-2 p-4"> */}
      {/* <legend className="text-lg font-medium text-center text-gray-700 mb-4"></legend> */}

      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        {checkboxes.map(({ id, label }) => (
          <label
            key={id}
            htmlFor={id}
            className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer"
          >
            <input
              type="checkbox"
              id={id}
              name={id}
              checked={checks[id]}
              onChange={handleChecks}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <label className="text-sm text-gray-500 shrink-0">Length</label>
        <input
          type="range"
          min="8"
          max="32"
          onChange={handleLength}
          value={checks.length}
          className="flex-1 accent-blue-500"
        />
        <span className="text-sm font-medium text-gray-700 w-6 text-right">
          {checks.length}
        </span>
      </div>
      {/* </div> */}
      <button
        onClick={handleClick}
        className="bg-gray-200 text-gray-800 p-2 rounded-lg border border-gray-200 hover:bg-gray-300 transition-colors font-medium text-sm mt-3 "
      >
        Generate
      </button>
      {checks.noChecks && (
        <p className="text-sm mt-2 text-center text-red-500">
          Please select at least one option
        </p>
      )}
      {/* </motion.form> */}
    </div>
  )
}

export default PasswordForm
