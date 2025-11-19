import { Copy } from '../components'
import { Props } from './Props'
const PasswordForm = ({ checks, handlers }: Props) => {
  const { handleChecks, handleClick, handleCopy, handleLength } = handlers

  return (
    <form id="password" className="flex flex-col">
      <div className="bg-[#d7eef8] border border-[#999898] mb-2 p-5 rounded-xl">
        <legend className="text-xl text-center">Password Generator</legend>
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
        className={`mt-2 flex justify-between rounded-md ${
          !checks.noChecks && 'bg-[#f3f3f3]'
        }`}
      >
        {checks.password && (
          <>
            <p className="font-['Consolas'] text-lg pl-2 w-[200px] flex flex-col justify-center ">
              {checks.password}
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
        {checks.noChecks && (
          <p
            className={`text-sm mt-1 text-center w-full ${
              checks.noChecks ? 'text-[#a10325] ' : 'text-[#cecdcd]'
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
