<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">Forgot password?</h1>
        <div class="form-floating">
          <input v-model="email" type="email" class="form-control" id="txtEmail" placeholder="name@example.com">
          <label for="txtEmail">Email address</label>
        </div>
        
        <button class="w-100 btn btn-lg btn-primary" type="button" @click="resetPW">Request password reset.</button>
        
        <div v-for="(alert, i) in getAuthFailureMessages.concat(alerts)" :key="i" class="alert alert-danger">{{alert.msg}}</div>
        
      </div>
    </div>
  </div>
</template>

<script>


import cf from '../modules/common-functions';
import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'LogIn',
  components: {

  },
  data() {
    return {
      email: '',
      alerts: []
    }
  },
  watch:{
    isAuthenticated(newVal) {
      if(newVal) {
        this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapGetters(['getAuthFailureMessages', 'isAuthenticated']),
    
  },
  methods: {
    ...mapActions(['logIn']),
    authenticate() {
      this.logIn(this.credentials);
    },
    async resetPW() {
      this.alerts = [];
      if(cf.isEmail(this.email)) {
        this.alerts.push({msg:'This aint work yet.'});
      } else {
        this.alerts.push({msg:'Email is required for password reset.'});
      }
    }
  }
};
</script>
<style scoped>
  .btn, .alert {
    margin-top: 10px;
  }
  .container {
    margin-top: 40px;
  }
</style>