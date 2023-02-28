import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ArtistsHookType } from '../../../../../types'

function Icon() {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

interface PropsType {
  artists: ArtistsHookType[]
}

export default function Search({ artists }: PropsType) {
  const history = useHistory()
  const [results, setResults] = useState<ArtistsHookType[]>([])
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const closeDialog = (articleId?: string, leaveInput = false) => {
    if (articleId) history.push(`/article/${articleId}`)
    setOpen(false)
    setResults([])
    if (!leaveInput && inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="border-b border-gray-400 hover:border-gray-600 focus-within:border-gray-600 px-2 py-1 flex items-center relative transition-colors ease-in-out">
      <input
        ref={inputRef}
        type="search"
        onChange={(e) => {
          const results = artists.filter(({ artistName }) =>
            artistName.toLowerCase().includes(e.target.value.toLowerCase())
          )
          results.sort(({ artistName: a }, { artistName: b }) =>
            a.toUpperCase().localeCompare(b.toUpperCase())
          )
          if (results.length === 0 || e.target.value === '')
            return closeDialog(undefined, true)
          setOpen(true)
          setResults(results)
        }}
        className="outline-none w-full text-gray-700 font-extralight"
      />
      <Icon />
      {results.length > 0 && (
        <dialog
          open={open}
          className="rounded shadow-md absolute top-11 left-2 min-w-full p-0"
        >
          <ul>
            {results.map(({ artistName, articleId }, n) => (
              <li
                key={`search-result-${n}`}
                onClick={() => closeDialog(articleId)}
                className="hover:bg-gray-50 hover:text-gray-700 whitespace-nowrap px-2 py-1 transition-colors cursor-pointer ease-in-out"
              >
                {artistName}
              </li>
            ))}
          </ul>
        </dialog>
      )}
    </div>
  )
}
