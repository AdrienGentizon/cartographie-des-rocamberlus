import React from 'react';

import { RichText } from 'prismic-reactjs';
import { ArtistLocationArticleDocument } from '../../../types';

interface ArtistLocationArticleProps {
  article: ArtistLocationArticleDocument;
}

export default function ArtistLocationArticle({
  article,
}: ArtistLocationArticleProps) {
  return (
    <article className="">
      <h3 className="text-md py-8">{RichText.asText(article.data.title)}</h3>
      <div
        className="flex flex-col gap-6 px-2
  font-light text-justify text-sm leading-relaxed"
      >
        {RichText.render(article.data.text)}
      </div>
      {article.data.pictures.length && (
        <div className="mt-12 border-t border-gray-200">
          <h3 className="py-6 text-md">Les photos</h3>
          <ul className="flex flex-col gap-2">
            {article.data.pictures.map((picture, n) => (
              <li key={`picture-${n}`}>
                <img src={picture.picture.url} alt="" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
