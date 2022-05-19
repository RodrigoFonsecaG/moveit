import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Login.module.css'

const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <div className={styles.details}>
        <img src="./icons/details.svg" alt="" />
      </div>

      <section className={styles.loginSection}>

          <img src="./icons/logo.svg" alt="" />


        <div className={styles.loginOptions}>
          <p>Bem-vindo</p>

          <button>
            <img src="./icons/github.svg" alt="" />
            Faça login com seu Github
          </button>
        </div>
      </section>
    </div>
  );
}

export default Login