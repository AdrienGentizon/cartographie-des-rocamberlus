'use client'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import React, { MouseEvent, ChangeEvent, useState, useRef } from 'react'
import CustomBorderDiv, {
  customBorderCssProperties,
} from '../../components/CustomBorderDiv/CustomBorderDiv'
import { ContactPage as ContactPageType } from '@/types'

export type ValidInputs = {
  contact_name: string
  contact_email: string
  message: string
}
export type Inputs = Partial<ValidInputs>
export type PostBody = ValidInputs & { 'form-name': 'contribution' }

export function isValidInputs(inputs: Inputs): inputs is ValidInputs {
  return (
    inputs.contact_name !== undefined &&
    inputs.contact_email !== undefined &&
    inputs.message !== ''
  )
}

function encodeFormPostBody(inputs: PostBody) {
  return Object.entries(inputs)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(value)
    )
    .join('&')
}

interface PropsType {
  contactPage: ContactPageType | undefined
  error?: Error
}

export default function ContactPage({ contactPage }: PropsType) {
  const [postResult, setPostResult] = useState<
    | {
        error: boolean
        title: string
        message: string
      }
    | undefined
  >(undefined)
  const [inputs, setInputs] = useState<Inputs>({
    contact_name: '',
    contact_email: '',
    message: '',
  })
  const button = useRef<HTMLButtonElement>(null)
  const name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const message = useRef<HTMLTextAreaElement>(null)

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setPostResult(undefined)
      if (!isValidInputs(inputs))
        return setPostResult({
          error: true,
          title: 'Oups',
          message: `
          Tous les champs sont requis 
          pour que nous puissions vous répondre 
          une fois votre message envoyé.
          `,
        })

      const response = await fetch(`/form.html`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeFormPostBody({
          'form-name': 'contribution',
          ...inputs,
        }),
      })
      if (response.status !== 200)
        return setPostResult({
          error: true,
          title: 'Oups',
          message: `Nous n'avons pas pu envoyer votre message`,
        })
      setPostResult({
        error: false,
        title: 'Merci',
        message: 'Votre message a bien été envoyé.',
      })
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
      throw error
    }
  }

  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <p
          style={{
            fontWeight: 200,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          }}
        >
          {children}
        </p>
      ),
    },
  }

  return (
    <>
      <div className="lg:py-8 py-2 px-16">
        {contactPage ? (
          documentToReactComponents(contactPage.message.json, renderOptions)
        ) : (
          <h2 className="text-lg font-thin">Envoyez votre contribution</h2>
        )}
      </div>
      <form
        name="contribution"
        method="post"
        data-netlify="true"
        className="lg:px-16 px-2 text-sm"
        onSubmit={onSubmit}
      >
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
                ref={name}
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
                ref={email}
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
                ref={message}
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
              documentToReactComponents(
                contactPage.credits.json,
                renderOptions
              )}
          </div>
        </div>
      </form>
      {postResult && (
        <dialog
          open
          style={{
            inset: '0 0 0 0',
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '50vw',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'hsla(0, 0%, 0%, 0.1)',
          }}
        >
          <div
            style={{
              border: 'solid 1px black',
              background: 'white',
              ...customBorderCssProperties,
              borderImageOutset: 0.001,
              borderRadius: '0.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.5rem 3rem',
            }}
          >
            <h1
              style={{
                fontWeight: 300,
                fontSize: '1.5rem',
              }}
            >
              {postResult.title}
            </h1>
            <p
              style={{
                fontWeight: 200,
                fontSize: '0.875rem',
                color: postResult.error
                  ? 'hsl(340, 100%, 53%)'
                  : 'hsl(0? 0%, 0%)',
                maxWidth: '35ch',
              }}
            >
              {postResult.message}
            </p>
            <button
              ref={button}
              style={{
                border: 'solid 1px hsl(0, 0%, 93%)',
                borderRadius: '0.25rem',
                padding: '0.125em 0.25em',
                fontSize: '0.875rem',
                fontWeight: 100,
                background: 'hsl(0, 0%, 100%)',
              }}
              onMouseOver={() => {
                if (!button.current) return
                button.current.style.background = 'hsl(0, 0%, 97%)'
              }}
              onMouseOut={() => {
                if (!button.current) return
                button.current.style.background = 'hsl(0, 0%, 100%)'
              }}
              onClick={() => {
                if (postResult?.error === false) {
                  if (name.current) name.current.value = ''
                  if (email.current) email.current.value = ''
                  if (message.current) message.current.value = ''
                }
                setPostResult(undefined)
              }}
            >
              Fermer
            </button>
          </div>
        </dialog>
      )}
    </>
  )
}
