<template>
  <div class="content">
    <div class="row" :key="decider._id" v-for="decider in deciders">
      <div class="col">
        <decider :decider="decider" 
          @choose-item="chooseItem" 
          @clear-items="clearItems" 
          @add-item="addItem" 
          @delete-item="deleteItem"
          @delete-decider="deleteDecider" 
          :ref="setDeciderRef" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-1">
        <button class="btn btn-primary" @click="add">+</button>
      </div>
      <div class="col-sm-11">
        <div class="form-floating" v-show="addMode">
          <input class="form-control" type="text" v-model="newDeciderName" id="txtNewDeciderName" v-on:keyup.enter="addDecider" ref="newName" />
          <label for="txtNewItem"> (+) New decider</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import Decider from '../components/Decider'
export default {
  components: { Decider },
  name: 'Deciders',
  data() {
    return {
      deciders: [],
      addMode: false,
      newDeciderName: '',
      deciderRefs: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'authHeader']),
  },
  beforeUpdate() {
    this.deciderRefs = [];
  },
  async mounted() {
    if(!this.isAuthenticated) {
      await this.reAuthenticate();
    } 
    if(!this.isAuthenticated) {
      this.$router.push('/');
    } else {
      let response = await fetch('/api/deciders', { 
        method: 'GET',
        headers: this.authHeader
      });
      let data = await response.json();
      this.deciders = data.deciders
      setTimeout(()=>{
        this.deciderRefs[0].focus();
      },100)
    }
  },
  
  methods: {
    ...mapActions(['reAuthenticate']),
    setDeciderRef(el) {
      this.deciderRefs.push(el);
    },
    add() {
      this.addMode = !this.addMode;
      setTimeout(() => {
        this.$refs.newName.focus();
      }, 100);
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
        }, 500);
      }
    },
    async clearItems(deciderID) {
      let response = await fetch('/api/deciders/clear-items', { 
        method: 'POST',  
        body: JSON.stringify({deciderID: deciderID }),
        headers: this.authHeader
      });
      let data = await response.json();
      let d = this.deciders.find(d => d._id == data.decider._id);
      d.items = data.decider.items;
    },
    async addItem(deciderID, text) {
      let response = await fetch('/api/deciders/add-item', { 
        method: 'POST',  
        body: JSON.stringify({deciderID: deciderID, text: text}),
        headers: this.authHeader
      });
      let data = await response.json();
      let d = this.deciders.find(d => d._id == data.decider._id);
      d.items = data.decider.items;
    },
    async deleteItem(deciderID, itemID) {
      let response = await fetch('/api/deciders/delete-item', { 
        method: 'POST',  
        body: JSON.stringify({deciderID: deciderID, itemID: itemID}),
        headers: this.authHeader
      });
      let data = await response.json();
      let d = this.deciders.find(d => d._id == data.decider._id);
      d.items = data.decider.items;
    },
    async deleteDecider(deciderID) {
      let response = await fetch('/api/deciders/delete', { 
        method: 'POST',  
        body: JSON.stringify({deciderID: deciderID }),
        headers: this.authHeader
      });
      let data = await response.json();
      this.deciders = data.deciders;
    },
    async addDecider() {
      let response = await fetch('/api/deciders/add', { 
        method: 'POST',  
        body: JSON.stringify({name: this.newDeciderName }),
        headers: this.authHeader
      });
      let data = await response.json();
      if (response.status == 200 && data.decider) {
        this.deciders.push(data.decider);
        setTimeout(() => {
          this.deciderRefs[this.deciderRefs.length - 1].focus();
        }, 100);
      }
      this.newDeciderName = '';
      this.addMode = false;
    },

  },
  watch:{
    isAuthenticated(newVal) {
      if(!newVal) {
        this.$router.push('/');
      }
    }
  }
  

};
</script>
<style scoped>
  .row {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
</style>