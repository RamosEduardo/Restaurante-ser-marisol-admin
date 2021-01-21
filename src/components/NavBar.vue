<template>
  <div>

    <template>
      <div>
        <b-sidebar id="sidebar-variant" :visible="viewSideBar" title="Menu" bg-variant="light" text-variant="DARK" shadow>
          <div class="px-3 py-2">
            
            <b-menu>
              <b-menu-list>
                <b-menu-item expanded>
                  <router-link :to="'/cardapios'">
                    <b-menu-item icon="book-open" label="Cardápio"></b-menu-item>
                  </router-link>
                  <router-link :to="'/tipos-eventos'">
                    <b-menu-item icon="archive" label="Serviços Oferecidos"></b-menu-item>
                  </router-link>
                  <!-- <router-link :to="'/estrutura'">
                    <b-menu-item icon="archive" label="Nossa Estrutura"></b-menu-item>
                  </router-link> -->
                  <router-link :to="'/fotos-casa'">
                    <b-menu-item icon="image" label="Fotos da Casa"></b-menu-item>
                  </router-link>
                  <router-link :to="'/eventos'">
                    <b-menu-item icon="image" label="Eventos"></b-menu-item>
                  </router-link>
                </b-menu-item>
                <b-menu-item icon="account" label="Sair" @click="logout()"/>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
      </div>
    </template>

    <b-navbar toggleable="lg" type="dark" variant="dark">
      


        <button-icon
          size="3"
          @open="viewSideBar = !viewSideBar"
          icon="grid-fill"
          color="outline-light"
        />

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="isAdmin === 'true'" left>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Admin Ser Marisol</em>
            </template>
            <b-dropdown-item @click="logout()">Sair</b-dropdown-item>
            <div>
              <b-dropdown-item @click="newUser()">
                Novo Usuário
              </b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
          <div v-else>
            <span style="color: white; cursor: pointer" @click="logout()">Sair</span>
          </div>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

import Botao from "./Botao";

export default {

  data() {
    return {
      viewSideBar: false,
      isAdmin: localStorage.getItem('isAdmin')
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('session');
      localStorage.removeItem('isAdmin');
      this.$router.push('/login')
    },
    newUser() {
      this.$router.push('/cadastro')
    }
  },

  components: {
    "button-icon": Botao,
  }
}
</script>
