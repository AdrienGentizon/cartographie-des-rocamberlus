import Layout from '../../components/Layout/Layout'
import Contribution from './Contribution/Contribution'

function ContactPage() {
  return <Contribution />
}

export default function Wrapper() {
  return (
    <Layout>
      <ContactPage />
    </Layout>
  )
}
