<template>
<div class="card">
  <div class="card-header">
   {{decider.name}}: <fai class="btn over-button float-end" icon="trash-can" title="Delete decider group" @click="$emit('delete-decider', decider._id)" />
  </div>
  <div class="card-body">
    <ul class="list-group" >
      <decider-item :decider-item="di" :key="di._id" v-for="di in decider.items" @delete-item="deleteItem" />
    </ul>
    <div class="form-floating">
      <input class="form-control" type="text" v-model="newItemText" id="textNewItem" v-on:keyup.enter="addItem" ref="newItemText" />
      <label for="txtNewItem"> (+) Type in a new item and return to add</label>
    </div>
    <button class="btn btn-primary" type="button" @click="$emit('choose-item', decider._id)" ><fai icon="dice" /> Decide</button>
    <button class="btn btn-secondary" type="button" @click="$emit('clear-items', decider._id)" ><fai icon="trash-can" /> Clear</button>
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
      this.$emit('add-item', this.decider._id, this.newItemText);
      this.newItemText = '';
    },
    deleteItem(itemID) {
      this.$emit('delete-item', this.decider._id, itemID);
    },
    focus() {
      console.log(`Focusing ${this.decider.name}`);
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
  button { 
    margin-top:5px;
    margin-right:10px;
  }
  .card-header {
    font-weight: bolder;
  }
</style>