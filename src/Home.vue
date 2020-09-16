<template>
  <section class="todoapp" style="background-color: gray; height:100vh">
    <nav-bar />
    <b-container>
      <div style="width: 100%;margin-top:100px; display: flex; flex-direction: column; height: 100%; justify-content: center; align-items: center">
        <img style="width: 20%" :src="logoImg" />
      </div>
    </b-container>
  </section>

</template>

<script>

import NavBar from "./components/NavBar";
import server from "./service/server.js";

export default {
  name: "App",

  data() {
    return {
      sideBarView: true,
      logoImg: '',
    };
  },

  async mounted() {
    const { data } = await server.get('/logo');
    this.logoImg = data.imagem;
  },

  components: {
    "nav-bar": NavBar,
  },
};
</script>