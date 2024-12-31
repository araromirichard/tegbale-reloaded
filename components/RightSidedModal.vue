<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

const isActive = ref(false);
const canShow = ref(false);

const props = defineProps<{
  visible: boolean;
  header: string;
  width?: string;
}>();

const emit = defineEmits(["update:visible"]);

const modal = ref<HTMLElement | null>(null);

const open = async () => {
  isActive.value = true;
  await nextTick();
  canShow.value = true;
};

const close = async () => {
  canShow.value = false;
  await new Promise((resolve) => setTimeout(resolve, 300));
  isActive.value = false;
  emit("update:visible", false);
};

watch(
  () => props.visible,
  async (val) => {
    if (val) {
      await open();
      document.body.style.overflow = "hidden";
    } else {
      await close();
      document.body.style.overflow = "";
    }
  },
  { immediate: true }
);

defineExpose({ open, close });
</script>

<template>
  <div
    v-if="props.visible"
    ref="modal"
    class="right-modal"
    :class="{ active: isActive }"
    @click="close"
  >
    <transition name="slide-right">
      <div v-if="canShow" class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ header }}</h3>
          <button @click="close" class="close-button">
            <Icon name="lucide:x" />
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.right-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  &.active {
    z-index: 1000;
    backdrop-filter: blur(2px);
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background: white;
    height: 100vh;
    width: v-bind('props.width || "25rem"');
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 100vh; // Added to ensure modal doesn't exceed viewport height

    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0; // Prevents header from shrinking

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
      }

      .close-button {
        background: transparent;
        border: none;
        padding: 0.25rem;
        cursor: pointer;

        &:hover {
          color: #ff5f5f;
        }
      }
    }

    .modal-body {
      flex: 1;
      overflow-y: auto; // Enables vertical scrolling
      padding: 1rem;
      height: calc(100vh - 4rem); // Subtracts header height

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
    }
  }
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
