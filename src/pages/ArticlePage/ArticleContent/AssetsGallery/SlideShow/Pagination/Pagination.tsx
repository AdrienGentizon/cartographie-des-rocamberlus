import React from 'react'

interface PropsType {
  assetIds: string[]
  selectedAssetId: string | undefined
}

export default function Pagination({ assetIds, selectedAssetId }: PropsType) {
  return (
    <ul
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      {React.Children.map(assetIds, (id) => (
        <li>
          <div
            style={{
              borderRadius: '100vh',
              mixBlendMode: 'difference',
              background:
                id === selectedAssetId
                  ? 'hsla(0, 0%, 100%, 1)'
                  : 'hsla(0, 0%, 100%, 0.4)',
              width: 6,
              height: 6,
            }}
          />
        </li>
      ))}
    </ul>
  )
}
