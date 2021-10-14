<template>
<div v-if="authUser && !authUser.confirmationDate" class="row justify-content-md-center">
  <div class="col-md-6">
    <h1>Thanks for registering, {{authUser.firstName}}!</h1>
    <p>An account confirmation email has been sent to {{authUser.email}}</p>
    <p>In order to complete the registration process, please follow the link in the email to confirm your account.</p>
    <button v-if="!authUser.confirmationDate" class="w-100 btn btn-lg btn-warning" type="button" @click="requestRegistrationEmail">Oops!  I lost my email.  Send me a new one.</button>
    <button v-if="authUser.confirmationDate" class="w-100 btn btn-lg btn-success" type="button" @click="gotoLogin">Account confirmed! Please log in.</button>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'RegistrationConfirmation',
  data: () => {
    return { }
  },
  computed:mapGetters(['authUser']),
  methods: {
    requestRegistrationEmail() {
      alert('this aint work yet');
    },
    gotoLogin() {
      this.$router.push('/login');
    },
  },
  created() {
    
  }
}
</script>
<style scoped>

</style>