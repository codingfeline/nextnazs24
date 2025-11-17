import { Copy } from '../components'

interface CheckState {
  lowercase?: boolean
  uppercase?: boolean
  numbers?: boolean
  symbols?: boolean
  length: string
  copied?: boolean
}
type HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => void

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleChecks: HandleInput
  handleLength: HandleInput
  handleCopy: () => void
  noChecks: boolean
  password: string
  checks: CheckState
}

const PasswordForm = ({
  noChecks,
  checks,
  password,
  handleChecks,
  handleClick,
  handleCopy,
  handleLength,
}: Props) => {
  return (
    <form id="password" className="flex flex-col">
      <div className="bg-[#d7eef8] border border-[#999898] mb-2 p-5 rounded-xl">
        <label htmlFor="lowercase">
          <input
            type="checkbox"
            id="lowercase"
            name="lowercase"
            checked={checks.lowercase}
            onChange={handleChecks}
          />
          Lowercase
        </label>
        <label htmlFor="uppercase">
          <input
            type="checkbox"
            id="uppercase"
            name="uppercase"
            checked={checks.uppercase}
            onChange={handleChecks}
          />{' '}
          Uppercase
        </label>
        <label htmlFor="numbers">
          <input
            type="checkbox"
            id="numbers"
            name="numbers"
            checked={checks.numbers}
            onChange={handleChecks}
          />{' '}
          Numbers
        </label>
        <label htmlFor="symbols">
          <input
            type="checkbox"
            id="symbols"
            name="symbols"
            checked={checks.symbols}
            onChange={handleChecks}
          />{' '}
          Symbols
        </label>
        <label htmlFor="">
          Length
          <input
            type="range"
            min="10"
            max="25"
            onChange={handleLength}
            value={checks.length}
          />{' '}
          {checks.length}
        </label>
      </div>
      <button
        onClick={handleClick}
        className="bg-[#a1d3eb] p-2 rounded-md border-[#1a6368] border hover:bg-[#c0e2f1]"
      >
        Generate
      </button>

      <div
        className={`mt-2 flex justify-between rounded-md ${!noChecks && 'bg-[#f3f3f3]'}`}
      >
        {password && (
          <>
            <p className="font-['Consolas'] text-lg pl-2 w-[200px] flex flex-col justify-center ">
              {password}
            </p>
            <div className="bg-[white] p-1 flex flex-col items-center rounded-r-md">
              <Copy
                size={25}
                onClick={handleCopy}
                fill={`${checks.copied ? 'green' : '#666'}`}
                className="cursor-pointer"
                title="Copy password"
              />{' '}
              <span className={`${checks.copied ? 'text-[green]' : 'text-[#fff]'}`}>
                ✓
              </span>
            </div>
          </>
        )}
        {noChecks && (
          <p
            className={`text-sm mt-1 text-center w-full ${
              noChecks ? 'text-[#a10325] ' : 'text-[#cecdcd]'
            }`}
          >
            Please select at least one option
          </p>
        )}
      </div>
      {/* </div> */}
    </form>
  )
}

export default PasswordForm
