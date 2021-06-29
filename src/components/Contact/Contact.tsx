import React, { MouseEvent, ChangeEvent, useState } from 'react';

interface Inputs {
  contact_name: string;
  contact_email: string;
  message: string;
}

interface FormFetchBody extends Inputs {
  'form-name': 'contact';
}

export default function Contact() {
  const [inputs, setInputs] = useState<Inputs>({
    contact_name: '',
    contact_email: '',
    message: '',
  });

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: MouseEvent<HTMLFormElement>) => {
    const encode = (inputs: FormFetchBody) => {
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
      event.preventDefault();
      const data = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...inputs }),
      });
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      name="contact"
      method="post"
      className="p-2 bg-gray-100 text-sm"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="contact_name" className="block text-left font-thin">
          Nom
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
    </form>
  );
}
