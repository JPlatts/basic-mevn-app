<template>
  <div>
    <h1>Home</h1>
    <div v-if="authUser" class="row">
      <div class="col">
        Welcome, {{authUser.firstName}} {{authUser.lastName}}!
      </div>  
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['authUser', 'isAuthenticated'])
  }
};
</script>