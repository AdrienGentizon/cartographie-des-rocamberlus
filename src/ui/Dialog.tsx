import { useState } from 'react'

export function Dialog({
  onClose,
  children,
}: React.PropsWithChildren<{ onClose: () => void }>) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <div
      onClick={handleClose}
      className="bg-black/50 absolute top-0 left-0 bottom-0 right-0 w-screen"
    >
      <dialog
        className="absolute inset-0 rounded bg-white"
        onClick={(e) => {
          e.stopPropagation()
        }}
        open={isOpen}
      >
        <div className="flex items-center justify-center">
          <div
            className="bg-white shadox-sm rounded z-20 mx-6 px-12 py-12
          flex flex-col items-center gap-2 font-thin text-center"
          >
            {children}
          </div>
        </div>
      </dialog>
    </div>
  )
}
