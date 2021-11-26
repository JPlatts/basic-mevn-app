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
  props: ['password', 'passwordValid'],
  emits: ['update:password', 'update:passwordValid'],
  data() {
    return {
      confirmPassword: '',
    }
  },
  computed: {
    isValid() {
      return (!!this.password && this.password.trim() !== '' && cf.isMedStrongPwd(this.password.trim()) && this.password.trim() === this.confirmPassword.trim());
    },
    passwordValue: {
      get() {
        return this.password;
      },
      set(v) {
        this.$emit('update:password', v);
        this.$emit('update:passwordValid', this.isValid);
      }
    },
    pwValid() {
      return (!!this.password && this.password.trim() !== '' && cf.isMedStrongPwd(this.password.trim()));
    },
    passwordValidationText() {
      if (!this.password || this.password.trim() == '') {
        return 'Password is required.';
      } else {
        return 'Password is too weak.';
       }
    },
    confirmationValid() {
      return (this.confirmPassword.trim() !== '' && this.password.trim() === this.confirmPassword.trim());
    }
  },
  watch: {
    confirmPassword() {
      this.$emit('update:passwordValid', this.isValid);
    }
  },
}
</script>
<style scoped>

</style>