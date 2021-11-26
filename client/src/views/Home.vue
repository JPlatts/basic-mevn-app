<template>
  <div>
    <h1>Home</h1>
    
    <div v-if="authUser" class="row">
      <div class="col">
        Welcome, {{authUser.firstName}} {{authUser.lastName}}!
      </div>  
    </div>
    <div class="row">
      <div  style="width:242px;margin-left:auto;margin-right:auto;margin-top:50px;">
    <pre v-if="isAuthenticated" style="text-align:left">
        '::::.
         _____A_
        /      /\
     __/__/\__/  \___
----/__|" '' "| /___/\----
    |''|"'||'"| |' '||
    `""`""))""`"`""""`
  /     /  /     /     
=========================
-  -  -  -  -  -  -  -  -
__________________________

    </pre>
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