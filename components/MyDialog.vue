<script lang="ts" setup>
const isActive = ref(false);
const visible = defineModel("visible", {
  type: Boolean,
  default: false,
});

const canShow = ref(false);

const props = defineProps({
  closeable: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits({
  onClose: () => true,
});

const modal = ref<HTMLElement | null>(null);

const open = () => {
  isActive.value = true;
  visible.value = true;
};

const viewHasScrollBar = computed(() => {
  if (window) {
    return window.innerWidth > document.documentElement.clientWidth;
  } else return false;
});

const close = () => {
  if (!props.closeable) {
    shakeContent();
    return;
  }
  canShow.value = false;
  emits("onClose");
  sleep(200).then(() => {
    isActive.value = false;
    visible.value = false;
  });
};

const shakeContent = () => {
  //add the shake class for few seconds
  document.querySelector(".app-modal")?.classList.add("not-closeable");
  sleep(500).then(() => {
    document.querySelector(".app-modal")?.classList.remove("not-closeable");
  });
};

const clickOutside = (e: any) => {
  if (e.target == e.currentTarget && props.closeable) {
    close();
  }

  if (e.target == e.currentTarget && !props.closeable) {
    shakeContent();
  }
};

// listen for escape key
onMounted(() => {
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && props.closeable) {
      close();
    }

    if (e.key === "Escape" && !props.closeable) {
      shakeContent();
    }
  });
});

// watch visible prop
watch(
  () => visible.value,
  (val: boolean) => {
    if (val) {
      open();
    } else {
      close();
    }
  },
  { immediate: true }
);

watch(
  () => isActive.value,
  async (val: boolean) => {
    if (val) {
      if (viewHasScrollBar.value) {
        document.body?.classList.add("no-scroll");
      }
      await sleep(2);
      canShow.value = true;
    } else {
      canShow.value = false;
      await sleep(1);
      document.body?.classList.remove("no-scroll");
    }
  },
  { immediate: true }
);

// expose open and close methods
defineExpose({
  open,
  close,
});
</script>
<template>
  <div
    v-if="visible"
    class="app-modal"
    :class="{ active: isActive }"
    @click="clickOutside"
  >
    <transition name="modal-anim">
      <slot v-if="canShow" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
  @include no-select;

  &.active {
    cursor: pointer;
    z-index: map-get($z-index, popup);
    backdrop-filter: blur(2px);
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &.not-closeable {
    > * {
      @include shake;
    }
  }
}
</style>
