<template>
  <div class="logon-container">
      <b-col className="form" cols="5">

        <form>

          <b-row>
            <b-col style="display:flex; align-itens:center; justify-content:center">
              <img src='./assets/logo.png' />
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col cols="12">
              <b-form-input v-model="loginForm.email" placeholder="Login"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col cols="12">
              <b-form-input v-model="loginForm.senha" type="password"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-4" style="display:flex; justify-content: center">
            <b-col>
              <!-- <router-link to="/"> -->
                <b-button @click="login()" :disabled="isClickButton" variant="danger" squared style="width:100%">Entrar</b-button>
              <!-- </router-link> -->
            </b-col>
          </b-row>

        </form>
      </b-col>
  </div>
</template>

<script>

import server from '@/service/server'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        senha: ''
      },
      isClickButton: false
    }
  },
  methods: {
    async login() {
      this.isClickButton = true
      const response = await server.post('/login', this.loginForm);
      if (response.status === 200) {
        alert('Login Efetuado!')
        localStorage.setItem(
          'session', this.loginForm.email
        )
        this.isClickButton = false
        this.$router.push('/')
      } else {
        alert('Tente Novamente!')
        this.isClickButton = false
      }
    }
  }
}
</script>

<style>
  .logon-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: auto;
    background-color: beige;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>