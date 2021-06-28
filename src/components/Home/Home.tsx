import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CONTACT_URL } from '../../routes';

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
    <main className="flex flex-col text-center flex-1">
      <h1 className="text-2xl py-8">{RichText.asText(docData.title)}</h1>

      <div className="bg-gray-100 py-8 px-2">
        <h3 className="text-md font-medium italic">
          {RichText.asText(docData.catch_phrase)}
        </h3>
        <p className="text-sm leading-4 mt-6 font-thin">
          {RichText.asText(docData.signup_message)}
        </p>
        <button
          className="mt-6 font-thin text-sm hover:bg-gray-200 border border-gray-500 rounded px-4 py-1"
          onClick={() => {
            history.push(CONTACT_URL);
          }}
        >
          Participer
        </button>
      </div>
      <div className="mt-12 px-2">
        <div className="font-thin text-lg">
          {RichText.render(docData.text_title)}
        </div>
        {docData.text_content.map((p: any, n: number) => (
          <p
            className="mt-8 font-light text-justify text-sm leading-relaxed"
            key={`text_content-${n}`}
          >
            {p.text}
          </p>
        ))}
      </div>
    </main>
  );
}
