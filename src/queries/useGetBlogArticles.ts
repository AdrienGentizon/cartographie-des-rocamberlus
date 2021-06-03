import Prismic from '@prismicio/client';
import { useEffect, useState } from 'react';

import { useClient } from '../contexts/ClientProvider/ClientProvider';
import { ArtistLocationArticleDocument } from '../types';

interface GetBlogArticlesHookStatus {
  data?: ArtistLocationArticleDocument[];
  error?: Error;
  loading: boolean;
}

export default function useGetBlogArticles() {
  const [status, setStatus] = useState<GetBlogArticlesHookStatus>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const { cms } = useClient();

  const getBlogArticles = async () => {
    setStatus((prev) => {
      return { ...prev, loading: true };
    });
    try {
      const response = await cms.query(
        Prismic.Predicates.at('document.type', 'artist_location_article')
      );
      if (response?.results.length)
        setStatus((prev) => {
          return {
            ...prev,
            loading: false,
            data: response.results as ArtistLocationArticleDocument[],
          };
        });
      return setStatus((prev) => {
        return {
          ...prev,
          loading: false,
          error: new Error('Cannot get blog articles.'),
        };
      });
    } catch (error) {
      return setStatus((prev) => {
        return { ...prev, loading: false, error };
      });
    }
  };

  useEffect(() => {
    getBlogArticles();
  }, []);

  return { ...status, getBlogArticles };
}
