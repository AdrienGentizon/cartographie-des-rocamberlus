import Image from 'next/image'
import React from 'react'

export function showLoader(loader: HTMLDivElement | null) {
  if (loader) loader.style.display = 'block'
}

export function hideLoader(loader: HTMLDivElement | null) {
  if (loader) setTimeout(() => (loader.style.display = 'none'), 360)
}

function Icon({ strokeWidth, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000000"
      strokeWidth={strokeWidth ?? 1.5}
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path
        d="M16.583 9.667C15.81 8.097 14.043 7 11.988 7 9.388 7 7.25 8.754 7 11"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14.494 9.722H16.4a.6.6 0 00.6-.6V7.5M7.417 13.667C8.191 15.629 9.957 17 12.012 17c2.6 0 4.736-2.193 4.988-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M9.506 13.622H7.6a.6.6 0 00-.6.6V16.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
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
        {/* <Icon
          style={{
            scale: 2,
            strokeWidth: 1,
            animation: 'rotation ease-in-out 1500ms infinite',
          }}
        /> */}
        <Image
          src={`/voiture.png`}
          width={101}
          height={68}
          alt="petite voiture rouge"
          style={{
            animation: 'rolling ease-out 600ms infinite',
          }}
        />
      </dialog>
    </div>
  )
}
