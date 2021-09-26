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


export default {
  name: 'App',
  components: {
    Nav,
    Footer
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
</style>
