<template>
<div class="container">
    <div class="row justify-content-md-center">
      <div v-if="user" class="col-md-6">
        <h1>Thanks for registering, {{user.firstName}}!</h1>
        <p>Your account has been confirmed.</p>
        <button v-if="user.confirmationDate || isConfirmed" class="w-100 btn btn-lg btn-success" type="button" @click="gotoLogin">Please log in.</button>
      </div>
      <div v-if="!requestValid" class="col-md-6">
        <div class="alert alert-danger">This account confirmation link is invalid.</div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'Confirm',
  components: {
    
  },
  props: {
    id: String, 
    confkey: String
  },
  data() {
    return {
      user: null,
      requestValid: false
    }
  },
  computed: {
    
  },
  methods: {
    gotoLogin() {
      this.$router.push('/login');
    },
  },
  async created() {
    let response = await fetch(`/api/users/confirm/${this.id}.${this.confkey}`, { 
      method: 'GET',  
      headers: { 'Content-Type': 'application/json' }
    });
    let d = await response.json();
    if(response.status === 200) {
      this.user = d.user;
      this.requestValid = d.user.confirmationDate !== undefined && d.user.confirmationDate !== null;
    } else {
      this.requestValid = false;
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