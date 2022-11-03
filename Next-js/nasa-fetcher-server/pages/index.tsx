import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Wow how cool, Next.JS for our Nasa App.
        </h1>


        <div className={styles.grid}>          
          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}></a>

        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
