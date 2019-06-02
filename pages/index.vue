<template>
  <div class="signin__container">
    <form
      class="form__container"
      @submit.prevent="sendForm"
    >
      <form-input
        v-model="formData.email"
        name="form-input"
        inner-label="Email"
      />
      <app-button
        color="white"
        text="CONTINUE"
      />
    </form>
  </div>
</template>

<script>
import FormInput from '~/components/Molecules/FormInput.vue'
import AppButton from '~/components/Atoms/AppButton.vue'

export default {
  components: {
    FormInput,
    AppButton
  },
  data: () => {
    return {
      formData: {
        email: ''
      }
    }
  },
  methods: {
    sendForm() {
      console.log(this.formData)
    }
  }
}
</script>

<style lang="scss">
.form__container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: $background-black;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
