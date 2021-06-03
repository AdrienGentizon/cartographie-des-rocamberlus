import Prismic from '@prismicio/client';
import { useEffect, useState } from 'react';

import { useClient } from '../contexts/ClientProvider/ClientProvider';
import { ArtistLocationArticleDocument } from '../types';

interface GetBlogArticlesHookStatus {
  data?: ArtistLocationArticleDocument;
  error?: Error;
  loading: boolean;
}

export default function useGetBlogArticle(uid?: string) {
  const [status, setStatus] = useState<GetBlogArticlesHookStatus>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const { cms } = useClient();

  const getBlogArticle = async () => {
    setStatus((prev) => {
      return { ...prev, loading: true };
    });
    if (!uid)
      return setStatus((prev) => {
        return {
          ...prev,
          loading: false,
          error: new Error('Cannot get blog article.'),
        };
      });
    try {
      const response = await cms.query(
        Prismic.Predicates.at('document.type', 'artist_location_article')
      );
      if (response?.results.length) {
        const blogArticle = (
          response.results as ArtistLocationArticleDocument[]
        ).find((r) => r.uid === uid);
        if (blogArticle) {
          setStatus((prev) => {
            return {
              ...prev,
              loading: false,
              data: blogArticle,
            };
          });
        }
        return setStatus((prev) => {
          return {
            ...prev,
            loading: false,
            error: new Error('Cannot get blog article.'),
          };
        });
      }
      return setStatus((prev) => {
        return {
          ...prev,
          loading: false,
          error: new Error('Cannot get blog article.'),
        };
      });
    } catch (error) {
      return setStatus((prev) => {
        return { ...prev, loading: false, error };
      });
    }
  };

  useEffect(() => {
    getBlogArticle();
    // eslint-disable-next-line
  }, []);

  return { ...status, getBlogArticle };
}
