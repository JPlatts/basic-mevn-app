<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">Please register</h1>
        <div class="form-floating">
          <input v-model="firstName" type="text" class="form-control"
            :class="{'is-invalid': !firstNameValid, 'is-valid': firstNameValid}"  
            id="txtFirstName" placeholder="First Name">
          <label for="txtFirstName">First name</label>
          <div class="invalid-feedback">First name is required.</div>
        </div>
        <div class="form-floating">
          <input v-model="lastName" type="text" class="form-control"
            :class="{'is-invalid': !lastNameValid, 'is-valid': firstNameValid}"
            id="txtLastName" placeholder="Last Name">
          <label for="txtLastName">Last name</label>
          <div class="invalid-feedback">Last name is required.</div>
        </div>
        <div class="form-floating">
          <input v-model="email" type="email" class="form-control" 
            :class="{'is-invalid': !emailValid, 'is-valid': emailValid}"
            id="txtEmail" placeholder="name@example.com">
          <label for="txtEmail">Email address</label>
          <div class="invalid-feedback">{{emailValidationText}}</div>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" 
            :class="{'is-invalid': !passwordValid, 'is-valid': passwordValid}"
            id="txtPwd" placeholder="Password">
          <label for="txtPwd">Password</label>
          <div class="invalid-feedback">{{passwordValidationText}} <password-help /></div>
        </div>
        <div class="form-floating">
          <input v-model="confirmPassword" type="password" class="form-control" 
            :class="{'is-invalid': !confirmationValid, 'is-valid': confirmationValid}"
            id="txtConfirmPassword" placeholder="Confirm Password">
          <label for="txtConfirmPassword">Confirm Password *</label>
        </div>
        <div class="checkbox mt-2 mb-3 form-control"
          :class="{'is-invalid': !acceptsConditions}">
          <input v-model="acceptsConditions" type="checkbox" id="chkTerms" />
          <label for="chkTerms"> I accept the</label> <Terms /> 
        </div>
        
        <button class="w-100 btn btn-lg btn-primary" type="button" @click="register">Sign up</button>

        <div v-for="(alert, i) in responseAlerts" :key="i" class="alert alert-danger">{{alert.msg}}</div>

      </div>
    </div>
  </div>
</template>

<script>

import Terms from '../components/Terms'
import PasswordHelp from '../components/PasswordHelp'
//import axios from 'axios'

export default {
  name: 'Register',
  components: {
    Terms,
    PasswordHelp
  },
  data() {
    return {
      firstName: 'Joe',
      lastName: 'Platts',
      email: 'japlatts@gmail.com',
      password: '1Double2@',
      confirmPassword: '1Double2@',
      acceptsConditions: true,
      responseAlerts: []
    }
  },
  computed: {
    firstNameValid() {
      return !this.firstName.trim() == '';
    },
    lastNameValid() {
      return !this.lastName.trim() == '';
    },
    emailValid() {
      return (this.email.trim() !== '' && this.isEmail(this.email));
    },
    emailValidationText() {
      if (this.email.trim() == '') {
          return 'Email address is required.';
      } else {
          return 'Email address is invalid.';
      }
    },
    passwordValid() {
      return (this.password.trim() !== '' && this.isMedStrongPwd(this.password.trim()));
    },
    passwordValidationText() {
      if (this.password.trim() == '') {
          return 'Password is required.';
      } else {
          return 'Password is too weak.';
      }
    },
    confirmationValid() {
      return (this.confirmPassword.trim() !== '' && this.password.trim() === this.confirmPassword.trim());
    },
    confirmationValidationText() {
      if (this.confirmPassword.trim() == '') {
          return 'Password confirmation is required.';
      } else {
          return 'Password confirmation does not match.';
      }
    }
  },
  methods: {
    async register() {
      this.responseAlerts = [];
      if(this.firstNameValid && this.lastNameValid && this.emailValid && this.confirmationValid && this.acceptsConditions) {
        let response = await fetch('/api/users/register', { 
          method: 'POST',  
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        let d = await response.json();
        if (response.status !== 200) {
          this.responseAlerts.push(d)
        } else {
          console.log(response);
          console.log(d);
          this.$router.push('/validate/abcv')
        }
      }
    },
    isEmail(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    isMedStrongPwd(pwd) {
      let re = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
      return re.test(pwd);
    }
  },
};
</script>
<style scoped>
  .container {
    margin-top:40px;
  }
  .checkbox label {
    margin-left: 5px;
  }
  button {
    margin-bottom:10px;
  }
</style>