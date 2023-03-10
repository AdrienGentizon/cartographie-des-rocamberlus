import { Dialog } from '../../../../ui'

interface SubmissionErrorProps {
  setSubmissionError: (status: boolean) => void
}

export default function SubmissionError({
  setSubmissionError,
}: SubmissionErrorProps) {
  const onClose = () => {
    setSubmissionError(false)
  }

  return (
    <Dialog onClose={onClose}>
      <p className="text-xl text-red-500">Echec de l'envoi</p>
      <p className="italic text-sm text-red-500">Essayer à nouveau</p>

      <p className="text-sm my-4">
        Une erreur s'est produite sur le serveur. Essayez à nouveau.
      </p>
      <h2>ozihnrgfonzfgonzrognzerog</h2>

      <button
        onClick={onClose}
        className="border rounded w-full py-1 text-sm uppercase font-thin bg-gray-100 my-8"
      >
        Retour
      </button>
    </Dialog>
  )
}
