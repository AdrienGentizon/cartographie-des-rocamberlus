import React, { useEffect, useState } from 'react';

import { RichText } from 'prismic-reactjs';
import { Link } from 'react-router-dom';
import { BLOG_URL } from '../../routes';
import useGetBlogArticles from '../../queries/useGetBlogArticles';
import { ArtistLocationArticleDocument } from '../../types';

export default function Blog() {
  const [docData, setDocData] = useState<
    undefined | ArtistLocationArticleDocument[]
  >(undefined);

  const { data, getBlogArticles } = useGetBlogArticles();

  useEffect(() => {
    if (!data) getBlogArticles();
    if (data) setDocData(data);
    // eslint-disable-next-line
  }, [data]);

  if (!docData) return <p>Loading...</p>;

  return (
    <div className="Blog">
      <div className="Blog__title">
        <h3>Blog</h3>
        <p>Une liste des articles publiés par l'équipe de Carte brute</p>
      </div>
      <ul>
        {docData.map((doc, n) => (
          <li key={`article-${n}`}>
            <Link to={`${BLOG_URL}/${doc.uid}`}>
              {RichText.asText(doc.data.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
