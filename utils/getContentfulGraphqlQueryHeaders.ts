export default function getContentfulGraphqlQueryHeaders() {
  return {
    authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`,
    "Content-Language": "en-us",
    "Content-Type": "application/json",
    credentials: "same-origin",
  };
}
