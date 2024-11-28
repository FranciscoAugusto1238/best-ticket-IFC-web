<template>
  <v-container>
    <h1>Login</h1>
    <v-form v-model="formValid">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
      />
      <v-text-field
        v-model="senha"
        label="Senha"
        type="password"
        required
      />
      <v-btn
        color="primary"
        @click="login"
        :disabled="!formValid"
      >
        Login
      </v-btn>
      <v-alert v-if="erroLogin" type="error" dense>
        Email ou senha inválidos!
      </v-alert>
      <v-btn
        color="primary"
        @click="goToCadastroUsuario"
      >
      Cadastre-se
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      senha: '',
      formValid: false,
      erroLogin: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/usuarios/login', {
          email: this.email,
          senha: this.senha,
        });
        localStorage.setItem('usuario', JSON.stringify(response.data));
        this.$router.push('/');
      } catch (error) {
        this.erroLogin = true;
        console.error('Erro de login:', error);
      }
    },
    goToCadastroUsuario() {
      this.$router.push({ name: 'CadastroUsuario' });
    },
  },
};
</script>

<style scoped>
</style>
