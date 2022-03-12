<template>
  <div>
    <h1>{{decider.name}}: <fai class="btn over-button" icon="trash-can" title="Delete decider group" @click="$emit('delete-decider', decider._id)" /></h1> 
    <ul class="list-group" >
      <decider-item :decider-item="di" :key="di._id" v-for="di in decider.items" @delete-item="deleteItem" />
    </ul>
    <div class="form-floating">
      <input class="form-control" type="text" v-model="newItemText" id="textNewItem" v-on:keyup.enter="addItem" ref="newItemText" />
      <label for="txtNewItem"> (+) New item</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="button" @click="$emit('choose-item', decider._id)" ><fai icon="dice" /> Decide.</button>
    <button class="w-100 btn btn-lg btn-secondary" type="button" @click="$emit('clear-items', decider._id)" ><fai icon="trash-can" /> Clear.</button>
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
</style>