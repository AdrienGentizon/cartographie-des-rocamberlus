import { ContentfulAsset } from "../types";
import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import getContentfulGraphqlQueryHeaders from "../utils/getContentfulGraphqlQueryHeaders";

const getImageFromIdQuery = (options?: {
  size?: number;
  resizeStrategy?: "PAD" | "FILL" | "SCALE" | "THUMB";
}) => `
  query asset($id: String!) {
    asset(id: $id) {
      sys {
        id
      }
      title
      description
      contentType
      fileName
      ${
        options?.size
          ? `url(transform: {
              width: ${options.size},
              resizeStrategy: ${
                options?.resizeStrategy ? options.resizeStrategy : "PAD"
              }
            })`
          : "url"
      }
      size
      width
      height
    }
  }
`;

export default async function getAssetFromId(
  id: string,
  options?: {
    size?: number;
    resizeStrategy?: "PAD" | "FILL" | "SCALE" | "THUMB";
  }
): Promise<{
  image?: ContentfulAsset;
  error?: Error;
}> {
  try {
    const getQueryOptionSize = () => {
      if (!options) return 720;
      if (options.size) {
        if (options.size === -1) return;
        return options.size;
      }
      return 720;
    };
    const response = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({
          query: getImageFromIdQuery({
            ...options,
            size: getQueryOptionSize(),
          }),
          variables: { id },
        }),
        cache: "default",
      }
    );
    const { data } = await response.json();
    return {
      image: data?.asset,
      error: undefined,
    };
  } catch (error) {
    console.error(
      convertErrorFromUnknownType(error, `[Error] getArticleFromId: ${id}`)
    );
    return {
      error: convertErrorFromUnknownType(
        error,
        `[Error] getArticleFromId: ${id}`
      ),
    };
  }
}
