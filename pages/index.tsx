import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const defaultEndpoint = 'http://localhost:3001/api/v1/product';

export async function getStaticProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
const Home: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Products</title>
      </Head>
      <main className={styles.nav}>
        <h1>Products</h1>
      </main>
      <div className={styles.cardContainer}>
        {!data ?
          <h1>Produtos não encontrados</h1>
          :
          data.map((data: { id: number; name: string; image: string; brand: string; price: number; }) => {
            const { id, name, image, brand, price } = data;
            return (
              <div className={styles.card} key={id}>
                <div className={styles.cardInfo}>
                  <Image
                    objectFit='fill'
                    width={200}
                    height={123}
                    src={image}
                    alt={image}
                  />
                  <p className={styles.prodName}>{name}</p>
                  <p className={styles.brand}>{brand}</p>
                  <p className={styles.price}>R$ {price}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
