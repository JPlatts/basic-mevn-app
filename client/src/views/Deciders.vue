<template>
  <div class="content">
    <div class="row" >
      <div class="col" :key="decider._id" v-for="decider in deciders">
        <decider :decider="decider" @choose-item="chooseItem" @clear-items="clearItems" @add-item="addItem" @delete-item="deleteItem" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="w-100 btn btn-lg btn-primary" type="button" @click="test"><fai icon="arrow-right-to-bracket" /> TEST</button>
      </div>
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
      deciders: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'authHeader']),
    
  },
  methods: {
    async test() {
      this.deciders[1].items[2].active = true;
    },
    async chooseItem(deciderID) {
      let decider = this.deciders.find(d => d._id === deciderID);
      if(!decider.deciding) {
        decider.deciding = true;
        decider.items = decider.items.map((d) => {
          d.active = false;
          return d
        });
        setTimeout(() => {
          let i = Math.floor(Math.random() * decider.items.length);
          decider.items[i].active = true;
          decider.deciding = false;
        },500);
      }
    },
    async clearItems(deciderID) {
      let decider = this.deciders.find(d => d._id === deciderID);
      decider.items = [];
    },
    async addItem(deciderID, text) {
      console.log(`add ${deciderID}::${text}`);
    },
    async deleteItem(deciderID, itemID) {
      console.log(`delete ${deciderID}::${itemID}`);
    }

  },
  
  watch:{
    isAuthenticated(newVal) {
      if(!newVal) {
        this.$router.push('/');
      }
    }
    
  },
  async mounted() {
    if(!this.isAuthenticated) {
      this.$router.push('/');
    }
    let response = await fetch('/api/deciders', { 
      method: 'GET',
      headers: this.authHeader
    });
    let data = await response.json();
    this.deciders = data.deciders

  },

};
</script>
<style scoped>
  .row {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
</style>