<template>
  <li class="list-group-item d-flex justify-content-between align-items-center"  :class="[deciderItem.active ? 'list-group-item-warning' : '']">
    {{deciderItem.text}}
    <span class="btn btn-primary" @click="$emit('delete-item', deciderItem._id)"><fai icon="trash-can" /></span>
  </li>
</template>
<script>
export default {
  name: 'DeciderItem',
  props: {
    deciderItem: Object,
  },
  emits: ['delete-item'],
}
</script>
