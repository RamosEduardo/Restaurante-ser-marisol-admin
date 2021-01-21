<template>
  <div class="logon-container">
      <loading :active.sync="isClickButton" 
        :can-cancel="false" 
        :is-full-page="true"
      />
      <b-col className="form" cols="5">

        <form>

          <b-row>
            <b-col style="display:flex; align-itens:center; justify-content:center">
              <img src='./assets/logo.png' />
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col cols="12">
              Email:
              <b-form-input v-model="rememberForm.email" placeholder="E-mail:"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col cols="12">
              Senha antiga:
              <b-form-input v-model="rememberForm.senhaAntiga" type="password" placeholder="Senha antiga"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col cols="12">
              Nova senha:
              <b-form-input v-model="rememberForm.novaSenha" type="password" placeholder="Nova Senha"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-4" style="display:flex; justify-content: center">
            <b-col>
              <!-- <router-link to="/"> -->
                <b-button @click="remember()" :disabled="isClickButton" variant="danger" squared style="width:100%">Confirmar</b-button>
              <!-- </router-link> -->
            </b-col>
          </b-row>

          <b-row class="mt-4" style="display:flex; justify-content: center">
            <b-col>
              <router-link to="/login">
                  Voltar para login
              </router-link>
            </b-col>
          </b-row>

        </form>
      </b-col>
  </div>
</template>

<script>

import server from '@/service/server'
import Loading from 'vue-loading-overlay';
  // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      rememberForm: {
        senhaAntiga: '',
        novaSenha: '',
        email: ''
      },
      isClickButton: false
    }
  },
  components: {
    loading: Loading
  },
  methods: {
    async remember() {
      this.isClickButton = true
      const { data } = await server.put('/recovery', this.rememberForm);
      this.isClickButton = false
      if (data.status === 200) {
        alert('Senha Alterada!')
        this.$router.push('/login')
      } else {
        alert('Ocorreu um problema! ' + JSON.stringify(data.msg))
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