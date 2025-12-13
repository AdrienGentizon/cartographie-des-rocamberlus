import convertErrorFromUnknownType from "../utils/convertErrorFromUnknownType";
import { PAGES } from "../utils/entriesIds";
import getContentfulGraphqlQueryHeaders from "../utils/getContentfulGraphqlQueryHeaders";
import { ContactPageProps, RawContactPage } from "../utils/types";

const GET_CONTACT_PAGE_QUERY = `
  query contactPage($id: String!) {
    contactPage(id: $id) {
      message {
        json
      }
      credits {
        json
      }
    }
  }
`;

function isValidContactPage(
  raw: RawContactPage | null
): raw is ContactPageProps {
  return (
    Boolean(raw?.message && raw.message.json.content.length > 0) &&
    Boolean(raw?.credits && raw.credits.json.content.length > 0)
  );
}

export default async function getContactPage(): Promise<{
  contactPage?: ContactPageProps;
  error?: Error;
}> {
  try {
    const response = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: getContentfulGraphqlQueryHeaders(),
        body: JSON.stringify({
          query: GET_CONTACT_PAGE_QUERY,
          variables: { id: PAGES.contact },
        }),
      }
    );
    const { data } = await response.json();
    return {
      contactPage:
        data && isValidContactPage(data.contactPage)
          ? data?.contactPage
          : undefined,
      error: undefined,
    };
  } catch (error) {
    console.error(convertErrorFromUnknownType(error, `[Error] getContactPage`));
    return {
      error: convertErrorFromUnknownType(error, `[Error] getContactPage`),
    };
  }
}
