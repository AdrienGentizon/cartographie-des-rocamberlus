import React from "react";

import Map from "../../components/Map/Map";

import useLocations from "../../contentful/useLocations";

import Main from "../../ui/Main";

export default function MapPage() {
  const { loading, error, data } = useLocations();

  if (loading) return <p>loading...</p>;
  if (error) return <p>error !</p>;
  if (data)
    return (
      <Main fullWidth>
        <Map locations={data.articleCollection.items} />
      </Main>
    );
  return <Main></Main>;
}
