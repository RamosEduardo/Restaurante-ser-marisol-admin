<template>
  <div id="app" class="app">

    <router-view />

  </div>
</template>
<script>
export default {
  data() {
    return {
      user: '',
      loading: true
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = localStorage.getItem('session')
      console.log(this.user);
      if (!this.user) {
        this.$router.push('/login')
      }
      this.loading = false
    }
  }
}
</script>
