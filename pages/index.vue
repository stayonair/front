<template>
  <div class="signin__container">
    <form
      class="form__container"
      @submit.prevent="sendForm"
    >
      <div 
        v-for="(item, index) in items" 
        v-bind:key="index"
        >
        <form-input
          v-model="formData[item.data]"
          :inner-label="item.innerLabel"
          name="form-input"
        />
      </div>
      <app-button
        color="white"
        text="CONTINUE"
      />
    </form>
  </div>
</template>

<script>
import indexed_db from '~/utils/api/indexed_db.js'
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
      },
      items: [
        { data: 'email', innerLabel: 'Email' },
        { data: 'password', innerLabel: 'Password' },
        { data: 'password_confirm', innerLabel: 'Password Confirm' }
      ]
    }
  },
  methods: {
    sendForm() {
      console.log(this.formData)
      // indexed_db
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
