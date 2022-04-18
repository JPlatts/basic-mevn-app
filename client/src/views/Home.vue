<template>
  <div>
    <div class="container px-4 py-5" id="featured-3">
    <h2 class="pb-2 border-bottom"><fai icon="house-chimney" /> Home</h2>
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
        <fai icon="train" class="feature-icon" />
        <h2>nexTrain</h2>
        <p>Choose your favorite MTA subway stations to have instant access to upcoming departure times (updated in real time). Always available.  No more fumbling between apps and refreshing to see how long you're going to wait or if you should start running :-)</p>
        <fai class="link-arrow" icon="chevron-right" />
        <a href="#" class="icon-link">Coming soon!</a>
      </div>
      <div class="feature col">
        <fai icon="circle-info" class="feature-icon" />
        <h2>About me</h2>
        <p>Hi! I'm Joe Platts (author). I've been developing for 15 plus years (mostly on the Microsoft stack).  This application was created as I am learning how to build in the MEVN stack. </p>
        <p>It is super nice to be able to build everthing with JavaScript! See the about page for a link to my GitHub for this project.</p>
        <fai class="link-arrow" icon="chevron-right" />
        <router-link class="icon-link" to="/about">About</router-link>
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
