<template>
<div class="card">
  <div class="card-header">
   {{decider.name}}: <fai class="btn over-button float-end" icon="trash-can" title="Delete decider group" @click="$emit('delete-decider', decider._id)" />
  </div>
  <div class="card-body">
    <ul class="list-group" >
      <decider-item :decider-item="di" :key="di._id" v-for="di in decider.items" @delete-item="deleteItem" />
    </ul>
    <div class="input-group form-floating">
      <input type="text" class="form-control" id="txtNewItem" v-model="newItemText" v-on:keyup.enter="addItem" ref="newItemText">
      <label for="txtNewItem"> (+) new option</label>
      <button class="btn btn-outline-primary" type="button" @click="addItem"><fai icon="plus-circle" /> Add</button>
    </div>

    <button class="btn btn-primary bottom" type="button" @click="$emit('choose-item', decider._id)" ><fai icon="dice" /> Decide</button>
    <button class="btn btn-secondary bottom" type="button" @click="$emit('clear-items', decider._id)" ><fai icon="trash-can" /> Clear</button>
  </div>
</div>
</template>
<script>

import DeciderItem from '../components/DeciderItem'
export default {
  components: { DeciderItem },
  name: 'Decider',
  data() {
    return {
      newItemText: ''
    }
  },
  props: {
    decider: Object
  },
  methods: {
    addItem() {
      if(this.newItemText.trim() !== '') {
        this.$emit('add-item', this.decider._id, this.newItemText);
        this.newItemText = '';
      } else {
        this.$refs.newItemText.focus();  
      }
    },
    deleteItem(itemID) {
      this.$emit('delete-item', this.decider._id, itemID);
    },
    focus() {
      this.$refs.newItemText.focus();
    }
  },
  emits: ['choose-item', 'clear-items', 'add-item', 'delete-item', 'delete-decider']
};
</script>
<style scoped>
  .over-button {
    color:blue;
  }
  button.bottom { 
    margin-top:10px;
    margin-right:10px;
  }
  .card-header {
    font-weight: bolder;
  }
  .input-group {
    margin-top:7px;
  }
</style>