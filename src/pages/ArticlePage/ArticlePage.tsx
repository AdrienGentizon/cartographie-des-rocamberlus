import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import useArticleFromId from '../../graphql/useArticleFromId'

import ArticleError from './ArticleError/ArticleError'
import ArticleDraft from './ArticleDraft/ArticleDraft'
import ArticleContent from './ArticleContent/ArticleContent'
import isDesktop from '../../utils/isDesktop'

function ArticlePage() {
  const { id } = useParams<{ id?: string }>()

  const { loading, error, article, draft } = useArticleFromId(id ?? '')

  if (loading) return <p>Loading...</p>

  if (error || article === undefined) return <ArticleError />

  if (draft) return <ArticleDraft />

  return <ArticleContent article={article} />
}

export default function Wrapper() {
  return (
    <Layout>
      <ArticlePage />
      <button
        style={{
          position: 'fixed',
          bottom: isDesktop() ? '2rem' : '0.75rem',
          right: isDesktop() ? '2rem' : '1rem',
          border: 'solid 1px black',
          borderRadius: '100vh',
          height: isDesktop() ? '2rem' : '1.5rem',
          width: isDesktop() ? '2rem' : '1.5rem',
          fontSize: isDesktop() ? '1rem' : '0.8rem',
        }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        &uarr;
      </button>
    </Layout>
  )
}
