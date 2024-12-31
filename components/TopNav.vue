<script lang="ts" setup>

const visible = ref(false);
const search = ref(false);
const route = useRoute();

const handleSearch = () => {
  search.value = !search.value;
};

// close sidebar on route change
watch(
  () => route.fullPath,
  () => {
    visible.value = false;
  }
);
</script>

<template>
  <div class="default-layout-top-nav">
    <div>
      <button class="button button--trigger" @click="visible = !visible">
        <Icon name="lucide:menu" />
      </button>
    </div>
    <div class="actions">
      <transition name="slide">
        <div v-if="search" class="search-container">
          <CoreWrapperSearch @collapse="search = false" />
        </div>
        <button class="button" v-else @click="handleSearch">
          <Icon name="lucide:search" />
        </button>
      </transition>
      <nuxt-link to="">
        <Icon name="lucide:bell" />
      </nuxt-link>

      <nuxt-link to="#">
        <Icon name="lucide:user-round" />
      </nuxt-link>
    </div>

    <!-- Native Vue Sidebar -->
    <ClientOnly>
      <Transition name="slide">
        <div v-if="visible" class="sidebar">
          <div class="sidebar-content">
            <AdminNav />
          </div>
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.default-layout-top-nav {
  height: 100%;
  @include layout-width;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .button {
    &--trigger {
      padding: to-rem(10);
      padding-left: 0;

      svg {
        color: #2a2829;
        font-size: to-rem(24);
      }

      @media screen and (min-width: to-rem(1025)) {
        display: none;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: to-rem(20);

    @media screen and (max-width: to-rem(767)) {
      display: none;
    }

    button,
    a {
      border-radius: 50%;
      height: to-rem(40);
      width: to-rem(40);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        color: #09481e;
      }

      svg {
        color: #2a2829;
        font-size: to-rem(24);
      }
    }

    a {
      background-color: #f0f0ed;
    }
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 272px;
    background: white;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .sidebar-content {
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }

  .search-container {
    overflow: hidden;
    transition: height 0.8s ease-out;
  }
}
</style>
