import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import React, { MouseEvent, ChangeEvent, useState } from 'react'
import CustomBorderDiv from '../../../components/CustomBorderDiv/CustomBorderDiv'
import useContactPage from '../../../graphql/useContactPage'
import postContribution from '../../../queries/postContribution'
import { Inputs } from '../../../types'
import InputsError from './InputsError/InputsError'
import SubmissionError from './SubmissionError/SubmissionError'
import SubmissionSuccess from './SubmissionSuccess/SubmissionSuccess'

export default function Contribution() {
  const { contactPage } = useContactPage()
  const [inputs, setInputs] = useState<Inputs>({
    contact_name: '',
    contact_email: '',
    message: '',
  })

  const [inputsError, setInputsError] = useState(false)
  const [submissionError, setSubmissionError] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault()

    const checkInputsValidity = (inputs: Inputs): boolean => {
      return Object.values(inputs).reduce(
        (prev, curr) => (prev && curr.length ? true : false),
        true
      )
    }

    setInputsError(false)
    setSubmissionError(false)
    setSubmissionSuccess(false)

    if (!checkInputsValidity(inputs)) return setInputsError(true)

    const { response, error } = await postContribution(inputs)
    if (error) return setSubmissionError(true)
    if (response) return setSubmissionSuccess(true)
  }

  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <p style={{ fontWeight: 200 }}>{children}</p>
      ),
    },
  }

  return (
    <form
      name="contribution"
      method="post"
      className="lg:p-16 p-2 pt-8 text-sm"
      onSubmit={onSubmit}
    >
      <div style={{ padding: '1rem 0' }}>
        {contactPage ? (
          documentToReactComponents(contactPage.message.json, renderOptions)
        ) : (
          <h2 className="py-2 text-lg font-thin mb-4">
            Envoyez votre contribution
          </h2>
        )}
      </div>
      <input type="hidden" name="form-name" value="contribution" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label
            htmlFor="contact_name"
            style={{
              display: 'block',
              textAlign: 'left',
              fontWeight: 100,
            }}
          >
            Nom du contributeur
          </label>
          <CustomBorderDiv>
            <input
              type="text"
              name="contact_name"
              id="contact_name"
              style={{
                width: '100%',
                outline: 'none',
                padding: '0.1rem 0.25rem',
              }}
              onChange={onInputChange}
            />
          </CustomBorderDiv>
        </fieldset>
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label
            htmlFor="contact_email"
            style={{
              display: 'block',
              textAlign: 'left',
              fontWeight: 100,
            }}
          >
            Adresse électronique
          </label>
          <CustomBorderDiv>
            <input
              type="email"
              name="contact_email"
              id="contact_email"
              style={{
                width: '100%',
                outline: 'none',
                padding: '0.1rem 0.25rem',
              }}
              onChange={onInputChange}
            />
          </CustomBorderDiv>
        </fieldset>
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label
            htmlFor="message"
            style={{
              display: 'block',
              textAlign: 'left',
              fontWeight: 100,
            }}
          >
            Message de contribution
          </label>
          <CustomBorderDiv>
            <textarea
              name="message"
              id="message"
              style={{
                width: '100%',
                outline: 'none',
                padding: '0.1rem 0.25rem',
                resize: 'none',
                height: '10ch',
              }}
              onChange={onInputChange}
            ></textarea>
          </CustomBorderDiv>
        </fieldset>
        <CustomBorderDiv style={{ minWidth: '100%' }}>
          <button
            type="submit"
            style={{
              fontSize: '1rem',
              padding: '0.25rem',
              fontWeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              minWidth: '100%',
            }}
          >
            Envoyer
          </button>
        </CustomBorderDiv>
        <div style={{ padding: '1rem 0' }}>
          {contactPage?.credits &&
            documentToReactComponents(contactPage.credits.json, renderOptions)}
        </div>
      </div>

      {inputsError && <InputsError setInputsError={setInputsError} />}
      {submissionError && (
        <SubmissionError setSubmissionError={setSubmissionError} />
      )}
      {submissionSuccess && (
        <SubmissionSuccess setSubmissionSuccess={setSubmissionError} />
      )}
    </form>
  )
}
