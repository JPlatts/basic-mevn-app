<template>
<header>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/"><fai icon="house-chimney" /> De-Idenfier</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/deidentifier"><fai icon="gear" /> De-Identifier</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/about"><fai icon="circle-info" /> About</router-link>
        </li>

      </ul>
      <div class="d-flex">
        <router-link v-if="!isAuthenticated" class="btn btn-success" to="/login" ><fai icon="arrow-right-to-bracket" /> Log in.</router-link>
        <button v-if="isAuthenticated" type="button" class="btn btn-secondary" @click="logOut" ><fai icon="arrow-right-from-bracket" /> Log out.</button>
      </div>
    </div>
  </div>
</nav>
</header>
</template>
<script>
import { Modal } from 'bootstrap';
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Nav',
  methods: {
    ...mapActions(['logOut']),
    showModal() {
      let m = new Modal(this.$refs.exampleModal);
      m.show();
    }

  },
  computed: mapGetters(['isAuthenticated']),
}
</script>