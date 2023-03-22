import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import useArticleFromId from '../../graphql/useArticleFromId'

import ArticleError from './ArticleError/ArticleError'
import ArticleDraft from './ArticleDraft/ArticleDraft'
import ArticleContent from './ArticleContent/ArticleContent'

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
          bottom: 32,
          right: 32,
          border: 'solid 1px black',
          borderRadius: '100vh',
          height: 32,
          width: 32,
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
