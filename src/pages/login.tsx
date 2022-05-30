import Head from 'next/head';
import React, { useEffect } from 'react';
import styles from '../styles/pages/Login.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';


const Login = () => {
  const { data: session } = useSession();

  // Rota Protegida
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

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

          <button onClick={() => signIn()}>
            <img src="./icons/github.svg" alt="" />
            Faça login com seu Github
          </button>

        </div>
      </section>
    </div>
  );
};


export default Login;
