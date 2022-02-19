<template>
  <div class="container">
    <div v-if="authUser" class="row justify-content-md-center">
    <div class="col-md-6">
      <h1>Thanks for registering, {{authUser.firstName}}!</h1>
      <p>An account confirmation email has been sent to {{authUser.email}}</p>
      <p>In order to complete the registration process, please follow the link in the email to confirm your account.</p>
    </div>
</div>
    <div class="row justify-content-md-center">
      <div v-if="!authUser" class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">Please register.</h1>
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
        <password-input v-model="passwordInput"  />
        <div class="checkbox mt-2 mb-3 form-control"
          :class="{'is-invalid': !acceptsConditions}">
          <input v-model="acceptsConditions" type="checkbox" id="chkTerms" />
          <label for="chkTerms"> I accept the</label> <Terms /> 
        </div>
        
        <button class="w-100 btn btn-lg btn-primary" type="button" @click="submitRegistration"><fai icon="user-plus" /> Sign up!</button>

        <div v-for="(alert, i) in getRegistrationErrorMessages" :key="i" class="alert alert-danger">{{alert.msg}}</div>

      </div>
    </div>
  </div>
</template>

<script>

import Terms from '../components/Terms';
import PasswordInput from '../components/PasswordInput';

import cf from '../modules/common-functions'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Register',
  components: {
    Terms,
    PasswordInput
  },
  data() {
    return {
      firstName: 'Joe',
      lastName: 'Platts',
      email: 'japlatts@gmail.com',
      passwordInput: { password: '', isValid: false },
      acceptsConditions: true,
    }
  },
  computed: {
    ...mapGetters(['authUser', 'getRegistrationErrorMessages', 'isAuthenticated']),
    firstNameValid() {
      return !this.firstName.trim() == '';
    },
    lastNameValid() {
      return !this.lastName.trim() == '';
    },
    emailValid() {
      return (this.email.trim() !== '' && cf.isEmail(this.email));
    },
    emailValidationText() {
      if (this.email.trim() == '') {
          return 'Email address is required.';
      } else {
          return 'Email address is invalid.';
      }
    },
  },
  watch:{
    isAuthenticated(newVal) {
      if(newVal) {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    if(this.isAuthenticated) {
      this.$router.push('/');
    }
  },
  methods: {
    ...mapActions(['register']),
    submitRegistration() {
      if(this.firstNameValid && this.lastNameValid && this.emailValid && this.passwordInput.isValid && this.acceptsConditions) {
        this.register(this.$data);
      }
    }
  }
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