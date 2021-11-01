import Contribution from "./Contribution/Contribution";

export default function ContactPage() {
  return (
    <main className="flex flex-col text-center flex-1">
      <h1 className="py-8 text-xl font-normal">Nous contacter</h1>
      <Contribution />
    </main>
  );
}
