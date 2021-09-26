<template>
    <span>
        <span class="lank" @click="showTerms">terms and conditions</span>
        <div class="offcanvas offcanvas-end" tabindex="-1" ref="termsCanvas" >
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">
                Terms and Conditions
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>"Biolerplate" terms and conditions will go here eventually.</p>
        </div>
        </div>
    </span>
    
</template>
<script>
import { Offcanvas } from 'bootstrap'
export default {
    name: 'Terms',
    methods: {
        showTerms() {
            let oc = new Offcanvas(this.$refs.termsCanvas)
            oc.toggle();
        }
    }
}
</script>
<style scoped>
span.lank {
  color: blue;
  cursor: pointer;
}

</style>