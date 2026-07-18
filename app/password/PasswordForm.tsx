import { Props } from './Props'

const PasswordForm = ({ checks, handlers }: Props) => {
  const { handleChecks, handleLength } = handlers

  const checkboxes = [
    { id: 'lowercase', label: 'Lowercase' },
    { id: 'uppercase', label: 'Uppercase' },
    { id: 'numbers', label: 'Numbers' },
    { id: 'symbols', label: 'Symbols' },
    { id: 'pronounceable', label: 'Pronounceable' },
  ] as const

  return (
    <div id="password" className="rounded-lg  flex flex-col">
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
          className="flex-1 accent-gray-500"
        />
        <span className="text-sm font-medium text-gray-700 w-6 text-right">
          {checks.length}
        </span>
      </div>
      {checks.noChecks && (
        <p className="text-sm mt-2 text-center text-red-500">
          Please select at least one option
        </p>
      )}
    </div>
  )
}

export default PasswordForm
