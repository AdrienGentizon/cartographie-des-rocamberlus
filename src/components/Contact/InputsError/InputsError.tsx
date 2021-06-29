import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';

interface InputsErrorProps {
  setInputsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputsError({ setInputsError }: InputsErrorProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
    setInputsError(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="bg-white shadox-sm rounded z-20 mx-6 px-12 py-12 flex flex-col items-center gap-6 font-thin text-center">
          <Dialog.Title className="text-xl text-red-500">
            Erreur de formulaire
          </Dialog.Title>
          <Dialog.Description className="italic text-sm text-red-500">
            Corrigez vos erreurs afin d'envoyer votre contribution
          </Dialog.Description>

          <p className="text-sm">
            Une ou plusieurs erreurs sont présentes sur votre formulaire qui ne
            peut être envoyé en l'état.
          </p>

          <button
            onClick={onClose}
            className="border rounded w-full py-1 text-sm uppercase font-thin bg-gray-100"
          >
            Retour
          </button>
        </div>
      </div>
    </Dialog>
  );
}
