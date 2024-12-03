<script setup lang="ts"></script>
<template>
  <div class="default-layout">
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
.default-layout {
  margin: auto;
  max-width: rem(2000);
  min-height: 100dvh;
  position: relative;

  @media screen and (min-width: rem(2000)) {
    border: rem(1) solid #e7e7e4;
  }

  nav {
    top: 0;
    left: 0;
    position: absolute;
    width: rem(300);
    height: 100vh;
    border-right: 1px solid #e7e7e4;

    @media screen and (max-width: rem(1024)) {
      display: none;
    }
  }

  main {
    margin-left: rem(300);
    width: calc(100% - rem(300));
    height: 100vh;
    top: 0;
    right: 0;
    position: absolute;
    overflow: auto;

    @media screen and (max-width: rem(1024)) {
      margin-left: 0;
      width: 100%;
    }

    header {
      height: rem(70);
      position: sticky;
      top: 0;
      z-index: 99;
      background-color: #fff;
      border-bottom: rem(1) solid #e7e7e4;

      @media screen and (max-width: rem(768)) {
        padding: 0 rem(15);
        border: none;
        height: rem(60);
      }

      @media screen and (min-width: rem(768)) {
        padding: 0 rem(30);
      }

      @media screen and (min-width: rem(1300)) {
        padding: 0 rem(50);
      }
    }

    #tegbale-app {
      @include layout-width;
    }
  }
}
</style>
