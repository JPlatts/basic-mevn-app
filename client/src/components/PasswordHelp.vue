<template>
  <span>
    <span class="lank" @click="showHelp">Help me!</span>
    <div class="offcanvas offcanvas-end" tabindex="-1" ref="helpCanvas" >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Password Help</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>Password must haves:
          <ul>
            <li>At least 8 characters</li>
            <li>At least 1 upper case letter</li>
            <li>At least 1 lower case letter</li>
            <li>At least 1 number</li>
            <li>At least 1 special character (!@#$%^&*)</li>
          </ul>
        </p>
      </div>
    </div>
  </span>
</template>
<script>
import { Offcanvas } from 'bootstrap'
export default {
  name: 'PasswordHelp',
  methods: {
    showHelp() {
      let oc = new Offcanvas(this.$refs.helpCanvas)
      oc.toggle();
    }
  }
}
</script>
<style scoped>
p {
  text-align: left;
}
span {
  color: black;
}
span.lank {
  color: blue;
  cursor: pointer;
}
</style>