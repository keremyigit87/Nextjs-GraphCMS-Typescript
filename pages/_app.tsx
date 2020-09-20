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
        <Head>
          <link rel="manifest" href="manifest.json" />
          <meta name="robots" content="noindex"/>

          <meta name="theme-color" content="#000000"/>
          <meta name='msapplication-TileColor' content='#2B5797' />
          <link rel="apple-touch-icon" href="/icons/android-icon-192x192.png" />

          <meta name='application-name' content='PWA App' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='PWA App' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
        </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreContext.Provider>
  )
}

export default MyApp
