<template>
  <div>
    <h1>{{decider.name}}:</h1>
    <ul class="list-group" >
      <decider-item :decider-item="di" :key="di._id" v-for="di in decider.items" @delete-item="deleteItem" />
    </ul>
    <div class="form-floating">
      <input class="form-control" type="text" v-model="newItemText" id="textNewItem" v-on:keyup.enter="$emit('add-item', decider._id, newItemText)"/>
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
  computed: {
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
    deleteItem(itemID) {
      this.$emit('delete-item', this.decider._id, itemID);
    },
    

  },
  emits: ['choose-item', 'clear-items', 'add-item', 'delete-item'],
};
</script>