<template>
  <div>
    <div class="container px-4 py-5" id="featured-3">
    <h2 class="pb-2 border-bottom"><fai icon="house-chimney" /> Home</h2>
    <div v-if="authUser" class="row">
      <div class="col">
        Welcome, {{authUser.firstName}} {{authUser.lastName}}!
      </div>  
    </div>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <fai icon="user-astronaut" class="feature-icon" />
        <h2>De-Identifier</h2>
        <p>Please log in to access the de-identification service.</p>
        <router-link v-if="isAuthenticated" to="/deidentifier" class="btn btn-primary"><fai icon="user-astronaut" /> De-Indentifier</router-link>
        <fai v-if="!isAuthenticated" class="link-arrow" icon="chevron-right" />
        <router-link v-if="!isAuthenticated" to="/login" class="">Log in to access</router-link>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['authUser', 'isAuthenticated'])
  }
};
</script>
<style scoped>
  .feature-icon {
    font-size: 48px;
    color:tomato;
    margin-bottom: 5px;
  }
  .link-arrow {
    color:#0d6efd;
    font-size: 12px;
    margin-right: 5px;
  }
</style>
