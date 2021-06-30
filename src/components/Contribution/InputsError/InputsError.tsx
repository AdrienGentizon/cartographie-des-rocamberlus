import { Dialog, Transition } from '@headlessui/react';
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
    <Transition
      show={isOpen}
      enter="transition duration-200 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-125 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />

          <div
            className="bg-white shadox-sm rounded z-20 mx-6 px-12 py-12
          flex flex-col items-center gap-2 font-thin text-center"
          >
            <Dialog.Title className="text-xl text-red-500">
              Envoi impossible
            </Dialog.Title>
            <Dialog.Description className="italic text-sm text-red-500">
              Corrections requises
            </Dialog.Description>

            <p className="text-sm my-4">
              Une ou plusieurs erreurs sont présentes sur votre formulaire qui
              ne peut être envoyé en l'état.
            </p>

            <button
              onClick={onClose}
              className="border rounded w-full py-1 text-sm uppercase font-thin bg-gray-100 my-8"
            >
              Retour
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
