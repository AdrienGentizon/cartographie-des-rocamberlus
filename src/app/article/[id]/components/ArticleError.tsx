import Link from '@/components/Link/Link'
import React from 'react'

export default function ArticleError() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '24rem',
      }}
    >
      <p
        style={{
          fontWeight: 100,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'rgb(156 163 175 / 1)',
        }}
      >
        Ah! petit problème technique.
      </p>
      <p
        style={{
          fontWeight: 100,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'rgb(156 163 175 / 1)',
        }}
      >
        Il est possible que cet article n&rsquo;existe pas.
      </p>
      <Link
        style={{
          fontWeight: 100,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'rgb(31 41 55 / 1)',
          textDecorationLine: 'underline',
          padding: '2rem 0',
        }}
        href={'/map'}
      >
        retour à la carte
      </Link>
    </div>
  )
}
