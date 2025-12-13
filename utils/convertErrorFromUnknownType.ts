export default function convertErrorFromUnknownType(
  possiblyUnknownError: unknown,
  messageIfUnknownType: string
) {
  return possiblyUnknownError instanceof Error
    ? possiblyUnknownError
    : new Error(messageIfUnknownType);
}
