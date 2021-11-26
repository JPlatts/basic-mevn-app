<template>
<div>
  <Nav />
  <router-view />
  <Footer />
</div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  methods: mapActions(['reAuthenticate', 'logOut']),
  computed: mapGetters(['isAuthenticated']),
  async created() {
    if(!this.isAuthenticated) {
      this.reAuthenticate();
    }

    setInterval(() => {
      if(!this.isAuthenticated) {
        this.reAuthenticate();
      }
      if(this.isAuthenticated && !localStorage.getItem('auth_token')) {
        this.logOut();
      }
    }, 2000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.form-control {
  margin-bottom: 5px;
}
</style>
