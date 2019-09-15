<template>
  <!-- <?xml version="1.0" ?> -->
  <svg
    class="icon--play"
    :class="getClasses"
    height="40px"
    version="1.1"
    viewBox="0 0 16 16"
    width="30px"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title />
    <defs />
    <g
      id="Icons with numbers"
      fill="none"
      fill-rule="evenodd"
      stroke="none"
      stroke-width="1"
    >
      <g
        id="Group"
        fill="#269EDD"
        transform="translate(-288.000000, -528.000000)"
      >
        <path
          id="Shape copy 3"
          d="M296,544 C291.581722,544 288,540.418278 288,536 C288,531.581722 291.581722,528 296,528 C300.418278,528 304,531.581722 304,536 C304,540.418278 300.418278,544 296,544 L296,544 Z M299,532 L297,532 L297,536 L297,540 L299,540 L299,532 L299,532 Z M295,532 L293,532 L293,536 L293,540 L295,540 L295,532 L295,532 Z M295,532"
        />
      </g>
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
