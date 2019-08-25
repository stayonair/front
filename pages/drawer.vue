<template>
  <div>
    <main class="title__container">
      <textarea
        class="title"
        placeholder="タイトルを入力"
      />
      <input
        id="ref-image"
        type="file"
        multiple
        accept="image/jpeg, image/png"
      >
      <label
        for="ref-image"
        class="label-ef-image"
      >
        + サムネイルを画像設定する
      </label>
    </main>
    <vue-drawer-layout ref="drawerLayout">
      <div
        slot="drawer"
        class="drawer"
      >
        <div class="text">
          This is drawer メニュー
        </div>
        <a
          href="javascript:void(0)"
          class="btn"
          @click="handleToggleDrawer"
        >
          Hide Drawer
        </a>
      </div>
      <div
        slot="content"
        class="content"
      >
        <div class="text">
          This is content.
        </div>
        <a
          href="javascript:void(0)"
          class="btn"
          @click="handleToggleDrawer"
        >
          Show Drawer
        </a>
      </div>
    </vue-drawer-layout>
  </div>

</template>

<script>
export default {
  methods: {
    handleToggleDrawer() {
      this.$refs.drawerLayout.toggle()
    }
  }
}
</script>

<style>
.drawer-wrap {
  background: yellow;
}
</style>
