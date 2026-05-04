'use client'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { useState } from 'react'

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
]

function getWinner(board: (string | null)[]): string | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return null
}

const codeSnippet = `const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],          // diagonals
]

function getWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b]
                 && board[a] === board[c])
      return board[a]
  }
  return null
}`

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isX, setIsX] = useState(true)

  const winner = getWinner(board)
  const isDraw = !winner && board.every(Boolean)

  const handleClick = (i: number) => {
    if (board[i] || winner) return
    const next = [...board]
    next[i] = isX ? 'X' : 'O'
    setBoard(next)
    setIsX(!isX)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsX(true)
  }

  const status = winner
    ? `Player ${winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${isX ? 'X' : 'O'}'s turn`

  return (
    <MyContainer header="Tic Tac Toe">
      <div className="flex flex-col items-center gap-4 py-2">
        <p className={`text-sm font-medium ${winner ? 'text-blue-600' : isDraw ? 'text-orange-500' : 'text-gray-500'}`}>
          {status}
        </p>

        <div className="grid grid-cols-3 gap-1">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`w-16 h-16 text-2xl font-bold rounded-md border-2 transition-colors
                ${cell === 'X' ? 'text-blue-600' : 'text-orange-500'}
                ${!cell && !winner ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer' : 'border-gray-200 cursor-default'}
                ${(winner || isDraw) ? 'opacity-70' : ''}
                bg-white`}
            >
              {cell}
            </button>
          ))}
        </div>

        <button
          onClick={reset}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          Reset
        </button>
      </div>

      <BrainsContainer>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
