import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return ( 
    <>
    <Head>
        <title>RezUp</title>
        <meta name="description" content="A result management app for Mountain University - Every Student A Musician" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Component {...pageProps} />
    </>
  )
}
