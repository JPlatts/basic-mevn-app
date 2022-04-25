<template>
  <div class="container px-4 py-5">
    <div class="row">
      <div class="col">
        <h2 class="pb-2 border-bottom">
          <fai icon="gear" /> De-Identifier
          </h2>
        <div v-if="response==''" class="btn btn-primary" @click="deidentify"><fai icon="gear" /> Run De-identification process.</div>
        <p>{{response}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'DeIdentifier',
  data() {
    return {
        response: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'authHeader']),
  },
  
  async mounted() {
    if(!this.isAuthenticated) {
      await this.reAuthenticate();
    } 
    if(!this.isAuthenticated) {
      this.$router.push('/');
    }
  },
  
  methods: {
    ...mapActions(['reAuthenticate']),
    async deidentify() {
        console.log('deidentify now!');
        let response = await fetch('/api/deidentifier', { 
            method: 'GET',
           headers: this.authHeader
        });
       let data = await response.json();
       this.response = data.response;
    
    },
  },
  watch:{
    isAuthenticated(newVal) {
      if(!newVal) {
        this.$router.push('/');
      }
    }
  }
  
};
</script>