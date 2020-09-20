import Layout from '../components/layout'
import '../styles/globals.scss'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import StoreContext from '../context/store';
import { useState, useEffect } from 'react'
import Head  from 'next/head'

function MyApp({ Component, pageProps }) {
  const [ isActive, setIsActive ] = useState(false);
  function toggleActive(){setIsActive(!isActive)}
  return(
    <StoreContext.Provider value={{
      isActive, toggleActive,
    }}>
      <DefaultSeo {...SEO}/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreContext.Provider>
  )
}

export default MyApp
