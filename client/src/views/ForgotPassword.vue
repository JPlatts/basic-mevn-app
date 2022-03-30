<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <h1 v-if="!successfulRequest" class="h3 mb-3 fw-normal">Forgot password?</h1>
        <h1 v-if="successfulRequest" class="h3 mb-3 fw-normal">A verification code has been sent to {{email}}</h1>
        <div v-if="!successfulRequest" class="form-floating">
          <input v-model="email" type="email" class="form-control" id="txtEmail" placeholder="name@example.com" v-on:keyup.enter="resetPW">
          <label for="txtEmail">Email address</label>
          <button class="w-100 btn btn-lg btn-primary" type="button" @click="resetPW" :disabled="locked"><fai icon="envelope-open-text" /> Request password reset.</button>
        </div>
        <div v-if="successfulRequest" class="form-floating">
          <input v-model="pwResetCode" type="password" class="form-control" id="txtResetCode"
            :class="{'is-invalid': !resetCodeValid, 'is-valid': resetCodeValid}"
          >
          <label for="txtResetCode">Password reset verification code</label>
          <password-input v-model="passwordInput" v-on:keyup.enter="setPW"  />
          <button class="w-100 btn btn-lg btn-primary" type="button" @click="setPW" :disabled="locked">Set password.</button>  
        </div>        
        <div v-for="(alert, i) in alerts" :key="i" class="alert alert-danger">{{alert.msg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import cf from '../modules/common-functions';
import PasswordInput from '../components/PasswordInput';
import {mapGetters} from 'vuex';


export default {
  name: 'ForgotPassword',
  components: {
    PasswordInput
  },
  data() {
    return {
      email: '',
      alerts: [],
      successfulRequest: false,
      locked: false,
      pwResetCode: '',
      passwordInput: { password: '', isValid: false }
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
    ...mapGetters(['isAuthenticated']),
    resetCodeValid() {
      return (!!this.pwResetCode && this.pwResetCode.trim() != '');
    }
    
  },
  methods: {
    async resetPW() {
      this.locked = true;
      this.alerts = [];
      if(cf.isEmail(this.email)) {
        let response = await fetch('/api/users/forgotpw', {
          method: 'POST',
          body: JSON.stringify({ email: this.email}),
          headers: { 'Content-Type': 'application/json' }
        });
        let data = await response.json();
        if (response.status !== 200) {
          this.alerts.push({msg: data.msg});
        } else {
          this.successfulRequest = true;
        }     
      } else {
        this.alerts.push({msg:'Email is required for password reset.'});
      }
      this.locked = false;
    },
    async setPW() {
      if(this.passwordInput.isValid) {
        this.locked = true;
        this.alerts = [];
        let response = await fetch('/api/users/resetpw', {
          method: 'POST',
          body: JSON.stringify({ email: this.email, resetCode: this.pwResetCode,  password: this.passwordInput.password }),
          headers: { 'Content-Type': 'application/json' }
        });
        let data = await response.json();
        if (response.status !== 200) {
          this.alerts.push({msg: data.msg});
        } else {
          this.$router.push('/login');
        }
        this.locked = false;
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