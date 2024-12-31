<script setup lang="ts">
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";

// Reactive state
const isActive = ref(false);
const canShow = ref(false);

// Props and Emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["update:modelValue", "close"]);

// Modal element reference
const modal = ref<HTMLElement | null>(null);

// Open the modal
const open = async () => {
  isActive.value = true;
  await nextTick();
  canShow.value = true;
};

// Close the modal
const close = async () => {
  if (!props.closeable) {
    shakeContent();
    return;
  }
  canShow.value = false;
  emits("close");
  await sleep(300); // Transition duration
  isActive.value = false;
  emits("update:modelValue", false);
};

// Shake content if not closeable
const shakeContent = () => {
  const modalElement = modal.value || document.querySelector(".app-modal");
  modalElement?.classList.add("not-closeable");
  setTimeout(() => {
    modalElement?.classList.remove("not-closeable");
  }, 500);
};

// Detect if the viewport has a scrollbar
const viewHasScrollBar = computed(() => {
  if (typeof window !== "undefined") {
    return window.innerWidth > document.documentElement.clientWidth;
  }
  return false;
});

// Handle clicking outside the modal
const clickOutside = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    close();
  }
};

// Escape key listener
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};

// Watchers for reactive behavior
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      await open();
      document.body.classList.add("no-scroll");
    } else {
      await close();
      document.body.classList.remove("no-scroll");
    }
  },
  { immediate: true }
);

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("keyup", handleEscape, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("keyup", handleEscape);
});

// Expose methods to parent components
defineExpose({
  open,
  close,
});
</script>

<template>
  <div
    v-if="props.modelValue"
    ref="modal"
    class="app-modal"
    :class="{ active: isActive }"
    @click="clickOutside"
  >
    <transition name="modal-anim">
      <div v-if="canShow" class="dialog-content">
        <div class="dialog-header">
          <slot name="header">
            <h3>Default Header</h3>
          </slot>
          <button v-if="props.closeable" @click="close" class="close-button">
            <Icon name="lucide:x" />
          </button>
        </div>
        <div class="dialog-body">
          <slot name="body" />
        </div>
      </div>
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

  &.active {
    cursor: default;
    z-index: 1000;
    backdrop-filter: blur(2px);
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dialog-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 650px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;

    // Custom scrollbar styles
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;

      &:hover {
        background: #666;
      }
    }

    .dialog-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 20px;
        font-weight: 500;
      }

      .close-button {
        background: transparent;
        border: none;
        padding: 4px;
        cursor: pointer;

        &:hover {
          color: #ff5f5f;
        }
      }
    }

    .dialog-body {
      padding: 20px;
    }
  }
}

.modal-anim-enter-active,
.modal-anim-leave-active {
  transition: all 0.3s ease-out;
}

.modal-anim-enter-from,
.modal-anim-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
