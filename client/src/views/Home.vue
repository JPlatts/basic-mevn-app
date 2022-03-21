<template>
  <div>
    <div class="container px-4 py-5" id="featured-3">
    <h2 class="pb-2 border-bottom">Home</h2>
    <div v-if="authUser" class="row">
      <div class="col">
        Welcome, {{authUser.firstName}} {{authUser.lastName}}!
      </div>  
    </div>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <fai icon="dice" class="feature-icon" />
        <h2>Decider</h2>
        <p>Having trouble making up your mind?!? Add your options to a list and let the Decider pick for you. Create as many decider lists as you want.  They'll be here when you come back.</p>
        <router-link v-if="isAuthenticated" to="/decider" class="btn btn-primary"><fai icon="dice" /> Decider</router-link>
        <fai v-if="!isAuthenticated" class="link-arrow" icon="chevron-right" />
        <router-link v-if="!isAuthenticated" to="/login" class="">Log in to access</router-link>
      </div>
      <div class="feature col">
        <fai icon="skull" class="feature-icon" />
        <h2>Featured title</h2>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <fai class="link-arrow" icon="chevron-right" />
        <a href="#" class="icon-link">Call to action</a>
      </div>
      <div class="feature col">
        <fai icon="skull" class="feature-icon" />
        <h2>Featured title</h2>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <fai class="link-arrow" icon="chevron-right" />
        <a href="#" class="icon-link">Call to action</a>
      </div>
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
<style scoped>
  .feature-icon {
    font-size: 48px;
    color:tomato;
    margin-bottom: 5px;
  }
  .link-arrow {
    color:#0d6efd;
    font-size: 12px;
    margin-right: 5px;
  }
</style>
