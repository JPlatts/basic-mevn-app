<template>
  <div class="container">
    <h1>Hello Confirm:  {{$route.params.id}}  {{id}}</h1>  
  </div>
</template>

<script>


//import axios from 'axios'

export default {
  name: 'Confirm',
  components: {
    
  },
  props: {
    id: String
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    
  },
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