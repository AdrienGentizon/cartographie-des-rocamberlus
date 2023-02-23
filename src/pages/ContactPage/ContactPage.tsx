import Layout from '../../components/Layout/Layout'
import Contribution from './Contribution/Contribution'

function ContactPage() {
  return (
    <main className="flex flex-col text-center flex-1">
      <Contribution />
    </main>
  )
}

export default function Wrapper() {
  return (
    <Layout>
      <ContactPage />
    </Layout>
  )
}
