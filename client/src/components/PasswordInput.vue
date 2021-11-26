<template>
    <span>
      <div class="form-floating">
        <input v-model="passwordValue" type="password" class="form-control" 
          :class="{'is-invalid': !pwValid, 'is-valid': pwValid}"
          id="txtPwd" placeholder="Password">
        <label for="txtPwd">Password</label>
        <div class="invalid-feedback">{{passwordValidationText}} <password-help /></div>
      </div>
      <div class="form-floating">
        <input v-model="confirmPassword" type="password" class="form-control" 
          :class="{'is-invalid': !confirmationValid, 'is-valid': confirmationValid}"
          id="txtConfirmPassword" placeholder="Confirm Password">
        <label for="txtConfirmPassword">Confirm Password *</label>
      </div>
    </span>
    
</template>
<script>
import cf from '../modules/common-functions';
import PasswordHelp from '../components/PasswordHelp';

export default {
  name: 'PasswordInput',
  components: {
    PasswordHelp
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      confirmPassword: '',
    }
  },
  computed: {
    isValid() {
      return (
        !!this.modelValue.password 
        && this.modelValue.password.trim() !== '' 
        && cf.isMedStrongPwd(this.modelValue.password.trim()) 
        && this.modelValue.password.trim() === this.confirmPassword.trim()
      );
    },
    passwordValue: {
      get() {
        return this.modelValue.password;
      },
      set(v) {
        this.$emit('update:modelValue', {password: v, isValid: this.isValid});
        
      }
    },
    pwValid() {
      return (!!this.modelValue.password && this.modelValue.password.trim() !== '' && cf.isMedStrongPwd(this.modelValue.password.trim()));
    },
    passwordValidationText() {
      if (!this.modelValue.password || this.modelValue.password.trim() == '') {
        return 'Password is required.';
      } else {
        return 'Password is too weak.';
       }
    },
    confirmationValid() {
      return (this.confirmPassword.trim() !== '' && this.modelValue.password.trim() === this.confirmPassword.trim());
    }
  },
  watch: {
    confirmPassword() {
      this.$emit('update:modelValue', {password: this.modelValue.password, isValid: this.isValid});
    }
  },
}
</script>
<style scoped>

</style>