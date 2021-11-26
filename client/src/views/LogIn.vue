<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">Welcome!</h1>
        <div class="form-floating">
          <input v-model="email" type="email" class="form-control" id="txtEmail" placeholder="name@example.com">
          <label for="txtEmail">Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="txtPwd" placeholder="Password">
          <label for="txtPwd">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="button" @click="authenticate">Log in.</button>
        <router-link class="w-100 btn btn-lg btn-outline-warning" to="/forgotpassword" >Forgot password?</router-link>
        <router-link class="btn btn-outline-success" to="/register" >Don't have an account? Sign Up!</router-link>
        <div v-for="(alert, i) in getAuthFailureMessages" :key="i" class="alert alert-danger">{{alert.msg}}</div>
        <p v-if="isUnconfirmed" >
          If you lost your confirmation email, you may run through the registration process again (24 hours after the last registration attempt).
        </p>
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
      email: 'japlatts@gmail.com',
      password: '1Double2@'
    }
  },
  watch:{
    isAuthenticated(newVal) {
      if(newVal) {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters(['authUser','getAuthFailureMessages', 'isAuthenticated']),
    credentials() { 
       return {email: this.email, password: this.password}
    },
    isUnconfirmed() {
      return this.getAuthFailureMessages.some(m => m.statusCode === 201);
    },
  },
  methods: {
    ...mapActions(['logIn']),
    authenticate() {
      this.logIn(this.credentials);
    },
    async resetPwd() {
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