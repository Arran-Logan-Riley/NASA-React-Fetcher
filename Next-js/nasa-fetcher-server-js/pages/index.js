import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import useSWR from 'swr'



export default function Home() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  function GetKey() {
    const { data, error } = useSWR('/api/hello', fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div>Here is your key: {data.key}</div>
  }
  
  return (
    <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Wow how cool, Next.JS for our Nasa App.
      </h1>
      <a><GetKey></GetKey></a>
    </main>
    <footer className={styles.footer}>
    </footer>
  </div>
  )
}
