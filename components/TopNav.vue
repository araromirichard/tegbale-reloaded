<script lang="ts" setup>
const visible = ref(false);
const search = ref(false);
const route = useRoute();

const handleSearch = () => {
  search.value = !search.value;
}

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

    <Sidebar v-model:visible="visible" :show-close-icon="false" :pt="{
      root: {
        style: {
          padding: '0px !important',
          width: '100% !important',
          maxWidth: '272px',
        },
      },

      header: {
        style: {
          display: 'none',
        },
      },

      content: {
        style: {
          padding: '0px !important',
        },
      },
    }">
      <AdminNav />
    </Sidebar>
  </div>
</template>
<style lang="scss" scoped>
.default-layout-top-nav {
  height: 100%;
  @include layout-width;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .button {
    &--trigger {
      padding: rem(10);
      padding-left: 0;

      svg {
        color: #2a2829;
        font-size: rem(24);
      }

      @media screen and (min-width: rem(1025)) {
        display: none;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: rem(20);

    @media screen and (max-width: rem(767)) {
      display: none;
    }

    button,
    a {
      border-radius: 50%;
      height: rem(40);
      width: rem(40);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        color: #09481e;
      }

      svg {
        color: #2a2829;
        font-size: rem(24);
      }
    }

    a {
      background-color: #f0f0ed;
    }
  }

  .search-container {
    overflow: hidden;
    transition: height 0.8s ease-out;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: height 0.8s ease-out;
    /* Match transition timing */
  }

  .slide-enter,
  .slide-leave-to {
    height: 0;
    /* Start with zero height to hide content */
    opacity: 0;
    /* Optionally fade out content */
  }
}
</style>
