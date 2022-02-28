<template>
  <div>
    <h1>Decider</h1>
    <ul class="list-group" >
      <decider-item :decider-item="di" :key="di.id" v-for="di in deciderItems" @delete-item="deleteItem" />
    </ul>
    <div class="form-floating">
      <input class="form-control" type="text" v-model="newItemText" id="textNewItem" v-on:keyup.enter="addItem"/>
      <label for="txtNewItem"> (+) New item</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="button" @click="chooseOne" ><fai icon="dice" /> Make a decision.</button>
    <button class="w-100 btn btn-lg btn-secondary" type="button" @click="clear" ><fai icon="trash-can" /> Clear list.</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import DeciderItem from '../components/DeciderItem'
export default {
  components: { DeciderItem },
  name: 'Decider',
  data() {
    return {
      deciderItems: [
        { id: 1, text: 'Seahorse Inn', active: false},
        { id: 2, text: 'Fowl Moos', active: false},
        { id: 2, text: 'Full Horse', active: false}
        
      ],
      newItemText: '',
      deciding: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    maxIdentity() {
      var max = 0;
      this.deciderItems.forEach((item) => {
        if(item.id > max) {
          max = item.id;
        }
      });
      return max;
    }
  },
  methods: {
    addItem() {
      console.log(this.deciderItems.length);
      this.deciderItems.push({id: this.maxIdentity + 1, text: this.newItemText});
      this.newItemText = '';
    },
    async chooseOne() {
      if (!this.deciding) {
        this.deciding = true;
        this.deciderItems = this.deciderItems.map((d) => {
          d.active = false;
          return d
        });
        setTimeout(() => {
          let i = Math.floor(Math.random() * this.deciderItems.length);
          this.deciderItems[i].active = true;
          this.deciding = false;
        },500)
      }
    },
    deleteItem(id) {
      let i = this.deciderItems.findIndex((item)=>{return item.id === id});
      this.deciderItems.splice(i, 1);
    },
    clear() {
      this.deciderItems = []
    }

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