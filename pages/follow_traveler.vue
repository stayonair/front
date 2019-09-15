<template>
  <div>
    <app-page-title 
      title="フォロートラベラー一覧"
    />
    {{ travelers }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppPageTitle from '~/components/Atoms/AppPageTitle'

export default {
  layout: 'user',
  components: {
    AppPageTitle
  },
  computed: {
    ...mapState({
      travelers: store => store.traveler.travelers
    }),
  }
}
</script>

<style>

</style>