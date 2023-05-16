<template>
<Modal :show="auth.refresh_token_invalid" size="small" no-close>
  <template #title>
    <h3 class="text-lg">
      <i class="fad fa-lock mr-2"></i>
      Please Login
    </h3>
  </template>
  <template #body>
    <Alert variant="warning">
      <b>For Security Reasons:</b>
      <p>
        You are required to login a fresh and renew your session.
      </p>
    </Alert>
     <LoginForm internal />
  </template>
  <template #footer>&nbsp;</template>
</Modal>
</template>

<script>
import Modal from "@/components/elements/Modal.vue";
import Alert from "@/components/elements/Alert.vue";
import LoginForm from "@/pages/Auth/LoginForm.vue";
import {useAuthStore} from "@/db/authentication";

export default {
  name: "MiniLogin",
  components: {LoginForm, Alert, Modal},
  setup(){
    const auth = useAuthStore()
    return {auth}
  }
}
</script>

<style scoped>

</style>