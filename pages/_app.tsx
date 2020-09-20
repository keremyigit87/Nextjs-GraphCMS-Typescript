import Layout from '../components/layout'
import '../styles/globals.scss'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <DefaultSeo {...SEO}/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
