<template>
  <div>
    <div class="container px-4 py-5" id="featured-3">
    <h2 class="pb-2 border-bottom"> Restore Registry De-Identification Process</h2>
    <div v-if="authUser" class="row">
      <div class="col">
        Welcome, {{authUser.firstName}} {{authUser.lastName}}!
      </div>  
    </div>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <h1><img src='@/assets/lowgo.png' /></h1>
        <br />
        <h2 v-if="!isAuthenticated">De-Identification Process</h2>
        <p v-if="!isAuthenticated">Please log in to access the de-identification service.</p>
        <fai v-if="!isAuthenticated" class="link-arrow" icon="chevron-right" />
        <router-link v-if="!isAuthenticated" to="/login" class="">Log in to access</router-link>
        <div v-if="response=='' && isAuthenticated" class="btn btn-primary" @click="deidentify">Click to Execute De-Identification process.</div>
        <p v-if="response!=='' && isAuthenticated">{{response}}</p>
      </div>
    </div>
   
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
        response: ''
    }
  },
  computed: {
    ...mapGetters(['authUser', 'isAuthenticated', 'authHeader'])
  },
  methods : {
    async deidentify() {
        console.log('deidentify now!');
        let response = await fetch('/api/deidentifier', { 
            method: 'GET',
           headers: this.authHeader
        });
       let data = await response.json();
       this.response = data.response;
    
    },
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
