import React from 'react'

interface PropsType {
  onClose: () => void
}

export default function CloseButton({ onClose }: PropsType) {
  return (
    <button
      style={{
        color: 'hsla(0, 100%, 100%, 0.5)',
        fontSize: 32,
        fontWeight: 100,
        position: 'absolute',
        top: 8,
        right: 24,
      }}
      onClick={onClose}
    >
      &times;
    </button>
  )
}
