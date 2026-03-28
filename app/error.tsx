"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <p>Désolé, quelque chose n&apos;a pas fonctionné.</p>
      <a href="/" className="underline">Retour à l&apos;accueil</a>
    </div>
  );
}
