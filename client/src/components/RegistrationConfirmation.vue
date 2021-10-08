<template>
<div>
  <h1>Thanks for registering, {{user.firstName}}!</h1>
  <p>An account confirmation email has been sent to {{user.email}}</p>
  <p>In order to complete the registration process, please follow the link in the email to confirm your account.</p>
  <button v-if="!user.confirmationDate && !isConfirmed" class="w-100 btn btn-lg btn-warning" type="button" @click="requestRegistrationEmail">Oops!  I lost my email.  Send me a new one.</button>
  <button v-if="user.confirmationDate || isConfirmed" class="w-100 btn btn-lg btn-success" type="button" @click="gotoLogin">Account confirmed! Please log in.</button>
</div>
</template>
<script>

export default {
  name: 'RegistrationConfirmation',
  props: {user: Object},
  data: () => {
    return {isConfirmed: false}
  },
  methods: {
    requestRegistrationEmail() {
      alert('this aint work yet');
    },
    gotoLogin() {
      this.$router.push('/login');
    },
    async checkForConfirmation() {
      if(!this.user || (!this.user.confirmationDate && !this.isConfirmed)) {
        if(this.user) {
          let response = await fetch(`/api/users/isconfirmed/${this.user._id}`, { 
            method: 'GET',  
            headers: { 'Content-Type': 'application/json' }
          });
          let d = await response.json();
          if(response.status === 200) {
            this.isConfirmed = d.isConfirmed;
            setTimeout(this.checkForConfirmation, 2000);
          }
        }
      } else {
        setTimeout(this.checkForConfirmation, 2000);
      }
    }

  },
  created() {
    this.checkForConfirmation();
  }
}
</script>
<style scoped>

</style>