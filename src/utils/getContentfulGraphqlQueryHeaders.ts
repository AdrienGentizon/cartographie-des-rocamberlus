export default function getContentfulGraphqlQueryHeaders() {
  return {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY}`,
    'Content-Language': 'en-us',
    'Content-Type': 'application/json',
    credentials: 'same-origin',
  }
}
