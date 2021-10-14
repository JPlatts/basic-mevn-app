<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/"><i class="fas fa-skull"></i> PlattsWork</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <div class="d-flex">
        <router-link v-if="!isAuthenticated" class="btn btn-outline-success" to="/login" >Log In</router-link>
        <button v-if="isAuthenticated" type="button" class="btn btn-secondary" @click="logOut" >Log Out</button>
      </div>
    </div>
  </div>
</nav>
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