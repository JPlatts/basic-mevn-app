<template>
  <footer class="footer mt-auto py-3 bg-dark">
  <div class="container">
    <span class="text-muted">Copyright &copy; {{currentYear}}</span>
  </div>
</footer>
</template>
<script>


export default ({
  name: 'Footer',
  setup() {
    
  },
  computed: {
    currentYear() { return new Date().getFullYear();}
  },
})
</script>

<style scoped>
a {
  color: #333;
}
footer {
  text-align: center;
}
</style>