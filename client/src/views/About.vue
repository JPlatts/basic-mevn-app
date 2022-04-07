<template>
  <div class="container px-4 py-5">
    <div class="row">
      <div class="col">
        <h2 class="pb-2 border-bottom">About</h2>
        <p>I put this web application together as I was learning how to build on the MEVN stack.</p>
        <p>This is a basic single page web application (SPA) with an API for JWT based authentication, account registration, and password management.</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>I exposed all of my source code for this project on <a href="https://github.com/JPlatts/basic-mevn-app">GitHub</a>.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <img src="@/assets/MongoDB_Logo_RGB_Logo_Forest-Green.svg" width="100" />
      </div>
      <div class="col-sm-3">
        <img src="@/assets/express-js-seeklogo.com.svg" width="100"/>
      </div>
      <div class="col-sm-3">
        <img src="@/assets/vue-js-seeklogo.com.svg" width="100" />
      </div>
      <div class="col-sm-3">
        <img src="@/assets/Node.js_logo.svg" width="100"/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'About',

};
</script>