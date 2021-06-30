import { Inputs, ContributionFormFetchBody } from '../types';

export default async function postContribution(
  inputs: Inputs
): Promise<{ response?: Response; error?: Error }> {
  const encode = (inputs: ContributionFormFetchBody) => {
    return Object.keys(inputs)
      .map(
        (key) =>
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(inputs[key as keyof Inputs])
      )
      .join('&');
  };

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contribution', ...inputs }),
    });
    return { response };
  } catch (error) {
    return { error };
  }
}
