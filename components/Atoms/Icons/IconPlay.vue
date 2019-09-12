<template>
  <svg
    id="_x31_0"
    class="icon--play"
    :class="getClasses"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xml:space="preserve"
  >
    <g>
      <path
        class="st0"
        d="M466.767,230.219L75.001,4.033C55.157-7.426,30.349,6.899,30.349,29.817v452.37
        c0,22.918,24.808,37.239,44.653,25.781l391.766-226.183C486.613,270.325,486.613,241.678,466.767,230.219z"
        fill="#fafbfd"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    getClasses() {
      return this.className
    }
  }
}
</script>

<style scoped lang="scss">
.icon--play {
  width: 2rem;
}
.play--red {
  fill: red;
}
</style>
