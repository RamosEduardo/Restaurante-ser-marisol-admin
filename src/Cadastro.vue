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
              Email:
              <b-form-input v-model="newUser.email" placeholder="Email" />
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col cols="12">
              Senha:
              <b-form-input v-model="newUser.senha" type="password" placeholder="Senha" />
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col cols="12">
              Confirmar senha:
              <b-form-input v-model="newUser.confirmacaoSenha" type="password" placeholder="Senha" />
            </b-col>
          </b-row>
          {{ verificaSenhas }}
          <br />
          <b-row class="mt-4">
            <b-col cols="12">
              <b-checkbox v-model="newUser.isAdmin">
                Conceder permissão de administrador?
              </b-checkbox>
              <!-- Conceder permissão de administrador?
              <b-field>
                
              </b-field> -->
            </b-col>
          </b-row>
          <b-row class="mt-4" style="display:flex; justify-content: center">
            <b-col>
              <b-button @click="cadastrar()" variant="danger" squared style="width:100%">
                Cadastrar
              </b-button>
            </b-col>
          </b-row>

          <b-row class="mt-4" style="display:flex; justify-content: center">
            <b-col>
              <router-link to='/'>
                Voltar ao meu painel
              </router-link>
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
      newUser: {
        senha: '',
        confirmacaoSenha: '',
        email: '',
        isAdmin: false
      }
    }
  },
  computed: {
    verificaSenhas() {
      if (this.newUser.senha !== this.newUser.confirmacaoSenha) return 'As senhas devem ser iguais!'
      if (this.newUser.senha.length <= 6) return 'A senha deve ter no mínimo 6 caracteres'
      return ''
    },
  },
  methods: {
    async cadastrar() {
      const {data} = await server.post('/user', this.newUser)
      alert(data.msg)
      setTimeout(() => {
        this.$router.push('/login')
      }, 300);
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