<template>
  <div class="row">
    <div class="col">
      <decider />
    </div>
    <div class="col">
      <decider />
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Decider from '../components/Decider'
export default {
  components: { Decider },
  name: 'Deciders',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    
  },
  methods: {

  },
  
  watch:{
    isAuthenticated(newVal) {
      if(!newVal) {
        this.$router.push('/');
      }
    }
    
  },
  mounted() {
    if(!this.isAuthenticated) {
      this.$router.push('/');
    }
  },

};
</script>