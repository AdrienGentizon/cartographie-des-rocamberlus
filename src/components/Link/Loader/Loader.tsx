import Image from 'next/image'
import React from 'react'
import voiturePNG from './voiture.png'

export function showLoader(loader: HTMLDivElement | null) {
  if (loader) loader.style.display = 'block'
}

export function hideLoader(loader: HTMLDivElement | null) {
  if (loader) setTimeout(() => (loader.style.display = 'none'), 360)
}

export default function Loader() {
  return (
    <div
      className="loader"
      style={{
        display: 'none',
        position: 'fixed',
        inset: '0 0 0 0',
        zIndex: 3000,
        pointerEvents: 'none',
      }}
    >
      <dialog
        open
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'transparent',
          paddingTop: '30vh',
        }}
      >
        <Image
          src={voiturePNG}
          alt="dessin d'une petite voiture rouge"
          style={{
            animation: 'rolling ease-out 600ms infinite',
          }}
        />
      </dialog>
    </div>
  )
}
