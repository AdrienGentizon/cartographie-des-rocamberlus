import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LOGIN } from '../../routes';

import Prismic from '@prismicio/client';
import { useClient } from '../../contexts/ClientProvider/ClientProvider';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface HomeDocument {
  title: RichTextBlock[];
  catch_phrase: RichTextBlock[];
  signup_message: RichTextBlock[];
  text_title: RichTextBlock[];
  text_content: RichTextBlock[];
}

export default function Home() {
  const history = useHistory();

  const { cms } = useClient();

  const [docData, setDocData] = useState<undefined | HomeDocument>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);

  const getHomeContent = async () => {
    const response = await cms.query(
      Prismic.Predicates.at('document.type', 'home')
    );
    if (response) {
      setDocData(response.results[0].data);
    }
  };

  useEffect(() => {
    getHomeContent().catch((error) => setError('something went wrong'));
    // eslint-disable-next-line
  }, []);

  if (error)
    return (
      <div className="Home">
        <h3 className="error">{error}</h3>
      </div>
    );

  if (!docData) return <div className="Home"></div>;

  return (
    <main className="Home">
      <h1 className="Home__title">{RichText.asText(docData.title)}</h1>

      <div className="Home__hero">
        <h3 className="Home__hero-catch-phrase">
          {RichText.asText(docData.catch_phrase)}
        </h3>
        <p className="Home__hero-message">
          {RichText.asText(docData.signup_message)}
        </p>
        <button
          className="Home__hero-button btn btn--transparent"
          onClick={() => {
            history.push(LOGIN);
          }}
        >
          Inscription
        </button>
      </div>
      <div className="Home__text">
        <h3 className="Home__text-title">
          {RichText.render(docData.text_title)}
        </h3>
        {docData.text_content.map((p: any, n: number) => (
          <p className="Home__text-content" key={`text_content-${n}`}>
            {p.text}
          </p>
        ))}
      </div>
    </main>
  );
}
