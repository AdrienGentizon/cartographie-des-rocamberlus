import { Dialog, Transition } from '@headlessui/react';
import React, { useState } from 'react';

interface SubmissionSuccessProps {
  setSubmissionSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubmissionSuccess({
  setSubmissionSuccess,
}: SubmissionSuccessProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
    setSubmissionSuccess(false);
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
            <Dialog.Title className="text-xl text-green-500">
              Succés de l'envoi
            </Dialog.Title>
            <Dialog.Description className="italic text-sm text-green-500">
              Votre contribution a bien été envoyée
            </Dialog.Description>

            <p className="text-sm my-4">
              Notre équipe va prendre en considération votre contribution. Nous
              vous tiendrons au courant si celle-ci est prise en compte sur
              notre site. Merci de voter soutien.
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
