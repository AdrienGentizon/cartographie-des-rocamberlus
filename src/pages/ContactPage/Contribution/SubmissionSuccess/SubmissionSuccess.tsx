import { Dialog } from '../../../../ui'

interface SubmissionSuccessProps {
  setSubmissionSuccess: (status: boolean) => void
}

export default function SubmissionSuccess({
  setSubmissionSuccess,
}: SubmissionSuccessProps) {
  const onClose = () => {
    setSubmissionSuccess(false)
  }

  return (
    <Dialog onClose={onClose}>
      <p className="text-xl text-green-500">Succés de l'envoi</p>
      <p className="italic text-sm text-green-500">
        Votre contribution a bien été envoyée
      </p>

      <p className="text-sm my-4">
        Notre équipe va prendre en considération votre contribution. Nous vous
        tiendrons au courant si celle-ci est prise en compte sur notre site.
        Merci de voter soutien.
      </p>

      <button
        onClick={onClose}
        className="border rounded w-full py-1 text-sm uppercase font-thin bg-gray-100 my-8"
      >
        Retour
      </button>
    </Dialog>
  )
}
