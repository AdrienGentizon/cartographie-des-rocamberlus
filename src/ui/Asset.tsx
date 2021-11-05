import React from "react";
import useImageFromId from "../contentful/useAssetFromId";

interface PropsType {
  id: string;
}

export function Asset({ id }: PropsType) {
  const { loading, error, data } = useImageFromId(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) return <img src={data.asset.url} alt="" className="my-4" />;
  return <></>;
}
