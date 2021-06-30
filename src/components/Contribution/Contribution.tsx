import React, { MouseEvent, ChangeEvent, useState } from 'react';
import postContribution from '../../queries/postContribution';
import { Inputs } from '../../types';
import InputsError from './InputsError/InputsError';
import SubmissionError from './SubmissionError/SubmissionError';
import SubmissionSuccess from './SubmissionSuccess/SubmissionSuccess';

export default function Contribution() {
  const [inputs, setInputs] = useState<Inputs>({
    contact_name: '',
    contact_email: '',
    message: '',
  });

  const [inputsError, setInputsError] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkInputsValidity = (inputs: Inputs): boolean => {
      return Object.values(inputs).reduce(
        (prev, curr) => (prev && curr.length ? true : false),
        true
      );
    };

    setInputsError(false);
    setSubmissionError(false);
    setSubmissionSuccess(false);

    if (!checkInputsValidity(inputs)) return setInputsError(true);

    const { response, error } = await postContribution(inputs);
    if (error) return setSubmissionError(true);
    if (response) return setSubmissionSuccess(true);
  };

  return (
    <form
      name="contribution"
      method="post"
      className="p-2 bg-gray-100 text-sm border-t border-b border-gray-200"
      onSubmit={onSubmit}
    >
      <h2 className="py-2 text-lg font-thin mb-4">
        Envoyez votre contribution
      </h2>
      <input type="hidden" name="form-name" value="contribution" />
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="contact_name" className="block text-left font-thin">
          Nom du contributeur
        </label>
        <input
          type="text"
          name="contact_name"
          id="contact_name"
          className="rounded border border-gray-200 px-2 py-1"
          onChange={onInputChange}
        />
        <label htmlFor="contact_email" className="block text-left font-thin">
          Adresse électronique
        </label>
        <input
          type="email"
          name="contact_email"
          id="contact_email"
          className="rounded border border-gray-200 px-2 py-1"
          onChange={onInputChange}
        />
        <label htmlFor="message" className="block text-left font-thin">
          Message de contribution
        </label>
        <textarea
          name="message"
          id="message"
          className="rounded border border-gray-200 px-2 py-1 resize-none h-48"
          onChange={onInputChange}
        ></textarea>
      </fieldset>
      <button
        type="submit"
        className="py-2 border rounded bg-gray-100 text-gray-600 font-normal text-sm uppercase w-full mt-4 mb-2"
      >
        Envoyer
      </button>
      {inputsError && <InputsError setInputsError={setInputsError} />}
      {submissionError && (
        <SubmissionError setSubmissionError={setSubmissionError} />
      )}
      {submissionSuccess && (
        <SubmissionSuccess setSubmissionSuccess={setSubmissionError} />
      )}
    </form>
  );
}
