<script setup lang="ts">
</script>
<template>
  <div class="admin-layout">
    <nav>
      <AdminNav />
    </nav>
    <main>
      <header>

        <TopNav />
      </header>
      <div id="tegbale-app">
        <slot />
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped>
.admin-layout {
  margin: auto;
  max-width: to-rem(2000);
  min-height: 100dvh;
  position: relative;

  @media screen and (min-width: to-rem(2000)) {
    border: to-rem(1) solid #e7e7e4;
  }

  nav {
    top: 0;
    left: 0;
    position: absolute;
    width: to-rem(300);
    height: 100vh;
    border-right: 1px solid #e7e7e4;

    @media screen and (max-width: to-rem(1024)) {
      display: none;
    }
  }

  main {
    margin-left: to-rem(300);
    width: calc(100% - to-rem(300));
    height: 100vh;
    top: 0;
    right: 0;
    position: absolute;
    overflow: auto;

    @media screen and (max-width: to-rem(1024)) {
      margin-left: 0;
      width: 100%;
    }

    header {
      height: to-rem(70);
      position: sticky;
      top: 0;
      z-index: 99;
      background-color: #fff;
      border-bottom: to-rem(1) solid #e7e7e4;

      @media screen and (max-width: to-rem(768)) {
        padding: 0 to-rem(15);
        border: none;
        height: to-rem(60);
      }

      @media screen and (min-width: to-rem(768)) {
        padding: 0 to-rem(30);
      }

      @media screen and (min-width: to-rem(1300)) {
        padding: 0 to-rem(50);
      }
    }

    #tegbale-app {
      @include layout-width;
    }
  }
}
</style>
