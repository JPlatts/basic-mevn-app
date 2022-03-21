<template>
<div class="container">
    <div class="row justify-content-md-center">
      <div v-if="authUser" class="col-md-6">
        <h1>Thanks for registering, {{authUser.firstName}}!</h1>
        <p>Your account has been confirmed.</p>
        <button v-if="authUser.confirmationDate" class="w-100 btn btn-lg btn-success" type="button" @click="gotoLogin">Please log in.</button>
      </div>
      <div v-if="!authUser" class="col-md-6">
        <div class="alert alert-danger">This account confirmation link is invalid.</div>
      </div>
    </div>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Confirm',
  components: {
    
  },
  props: {
    id: String, 
    confkey: String
  },
  data() {
    return { }
  },
  computed: mapGetters(['authUser', 'isAuthenticated']),
  methods: {
    ...mapActions(['confirmAccount']),
    gotoLogin() {
      this.$router.push('/login');
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
  async created() {
    this.confirmAccount({id: this.id, key: this.confkey})
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