<template>
<div class="d-flex flex-column h-100">
  
  <Nav />
  
  <main class="flex-shrink-0">
    <div class="container">
      <router-view />
    </div>
  </main>
  <Footer />
</div>
</template>

<script>
//import '@fortawesome/fontawesome-free/css/all.min.css'
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
html, body {
  height: 100%;
} 
#app {
  font-family: 'Courier New', monospace;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  
}
.form-control {
  margin-bottom: 5px;
}
</style>
