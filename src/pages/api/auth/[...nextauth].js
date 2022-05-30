// importando NextAuth, que é nosso pacote principal.
import NextAuth from 'next-auth';

//importando GitHub Provider da biblioteca, que são serviços que podemos integrar ao nosso aplicativo para permitir que os usuários façam login com o github.
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  // Configurando providers, neste caso do github
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
    // ...add more providers here
  ]
});
