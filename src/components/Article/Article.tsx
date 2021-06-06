import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import { RichText } from 'prismic-reactjs';

import useGetBlogArticle from '../../queries/useGetBlogArticle';
import { ArtistLocationArticleDocument, GqlLocation } from '../../types';
import useGetLocation from '../../queries/useGetLocation';
import Mapping from '../Map/Mapping/Mapping';

export default function Article() {
  const { id: articleId } = useParams<{ id?: string }>();

  const [docData, setDocData] =
    useState<undefined | ArtistLocationArticleDocument>(undefined);

  const { data, getBlogArticle } = useGetBlogArticle(articleId);
  const [location, setLocation] = useState<GqlLocation | undefined>(undefined);
  const [getLocation, { data: getLocationData }] = useGetLocation();

  useEffect(() => {
    if (!data) getBlogArticle();
    if (data) {
      setDocData(data);
      console.log(data.data.text);
      getLocation({ variables: { id: data.data.id_location } });
    }
    if (getLocationData) {
      setLocation(getLocationData.location);
    }
    // eslint-disable-next-line
  }, [data, getLocationData]);

  if (!docData)
    return (
      <div className="Article">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="Article">
      <article>
        <h1>{RichText.asText(docData.data.title)}</h1>
        <p>{RichText.asText(docData.data.text)}</p>
      </article>
      {location && (
        <div className="Map">
          <h2>Emplacement</h2>
          <Mapping
            id={`article-map-${docData.id}`}
            locations={[location]}
            center={location}
          />
        </div>
      )}
      <div className="Gallery">
        <h2>Les photos</h2>
        <ul>
          {docData.data.pictures.map((picture, n) => (
            <li key={`picture-${n}`}>
              <img src={picture.picture.url} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
