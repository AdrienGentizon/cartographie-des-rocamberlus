import { Dialog } from '../../../../components/Dialog/Dialog'

interface InputsErrorProps {
  setInputsError: (status: boolean) => void
}

export default function InputsError({ setInputsError }: InputsErrorProps) {
  const onClose = () => {
    setInputsError(false)
  }

  return (
    <Dialog onClose={onClose}>
      <p className="text-xl text-red-500">Envoi impossible</p>
      <p className="italic text-sm text-red-500">Corrections requises</p>

      <p className="text-sm my-4">
        Une ou plusieurs erreurs sont présentes sur votre formulaire qui ne peut
        être envoyé en l'état.
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
