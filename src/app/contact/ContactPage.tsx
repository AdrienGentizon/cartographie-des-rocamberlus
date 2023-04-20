'use client'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import React, { MouseEvent, ChangeEvent, useState } from 'react'
import CustomBorderDiv from '../../components/CustomBorderDiv/CustomBorderDiv'
import postContribution from '../../queries/postContribution'
import { Inputs } from '../../types'
import InputsError from './InputsError'
import { ContactPage as ContactPageType } from '@/types'
import { useRouter } from 'next/navigation'

interface PropsType {
  contactPage: ContactPageType | undefined
  error?: Error
}

export default function ContactPage({ contactPage }: PropsType) {
  const router = useRouter()
  const [inputs, setInputs] = useState<Inputs>({
    contact_name: '',
    contact_email: '',
    message: '',
  })

  const [inputsError, setInputsError] = useState(false)

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

    if (!checkInputsValidity(inputs)) return setInputsError(true)

    const { response, error } = await postContribution(inputs)
    if (error) return
    if (response) return router.push('/')
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
      className="lg:p-16 p-2 text-sm"
      onSubmit={onSubmit}
    >
      <div className="lg:py-4 py-2">
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
    </form>
  )
}
