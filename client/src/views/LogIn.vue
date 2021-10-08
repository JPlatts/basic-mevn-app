<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div v-if="user" class="col-md-6">
        <registration-confirmation :user="user"/>
      </div>
      <div v-if="!user" class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">Welcome!</h1>
        <div class="form-floating">
          <input v-model="email" type="email" class="form-control" 
            id="txtEmail" placeholder="name@example.com">
          <label for="txtEmail">Email address</label>
          
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" 
            id="txtPwd" placeholder="Password">
          <label for="txtPwd">Password</label>
        </div>
        
        <button class="w-100 btn btn-lg btn-primary" type="button" @click="authenticate">Log in.</button>
        <button class="w-100 btn btn-lg btn-warning" type="button" @click="resetPwd">Forgot password? Reset.</button>
        <router-link class="btn btn-outline-success" to="/register" >Don't have an account? Sign Up!</router-link>
        <div v-for="(alert, i) in alerts" :key="i" class="alert alert-danger">{{alert.msg}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import RegistrationConfirmation from '../components/RegistrationConfirmation';
import cf from '../modules/common-functions';

export default {
  name: 'LogIn',
  components: {
    RegistrationConfirmation
  },
  data() {
    return {
      email: 'japlatts@gmail.com',
      password: '1Double2@',
      user: null,
      alerts: []
    }
  },
  computed: {},
  methods: {
    async authenticate() {
      this.alerts = [];
      if(cf.isEmail(this.email) && cf.isMedStrongPwd(this.password)) {
        this.alerts.push({msg:'This aint work yet.'});
      }
    },
    async resetPwd() {
      this.alerts = [];
      if(cf.isEmail(this.email)) {
        this.alerts.push({msg:'This aint work yet.'});
      } else {
        this.alerts.push({msg:'Email is required for password reset.'})
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