<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String as PropType<"primary" | "secondary" | "outline" | "text">,
    default: "primary",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  block: {
    type: Boolean,
    default: false,
  },
  hasDropdown: {
    type: Boolean,
    default: false,
  }
});

const isOpen = ref(false);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const buttonClasses = computed(() => ({
  "custom-button": true,
  [`custom-button--${props.variant}`]: true,
  [`custom-button--${props.size}`]: true,
  "custom-button--block": props.block,
  "custom-button--loading": props.loading,
  "custom-button--disabled": props.disabled,
  "custom-button--dropdown": props.hasDropdown,
}));
</script>

<template>
  <div class="button-wrapper" :class="{ 'has-dropdown': hasDropdown }">
    <button 
      :class="buttonClasses" 
      :type="type" 
      :disabled="disabled || loading"
      @click="hasDropdown ? toggleDropdown() : $emit('click')"
    >
      <span v-if="loading" class="loader"></span>
      <span v-else class="button-content">
        <slot></slot>
        <Icon v-if="hasDropdown" name="lucide:chevron-down" class="dropdown-icon" />
      </span>
    </button>

    <div v-if="hasDropdown" v-show="isOpen" class="dropdown-menu">
      <slot name="dropdown-items"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  position: relative;
  display: inline-block;

  &.has-dropdown {
    .dropdown-icon {
      margin-left: to-rem(4);
      transition: transform 0.2s ease;
    }

    &:has(.dropdown-menu:visible) {
      .dropdown-icon {
        transform: rotate(180deg);
      }
    }
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + to-rem(4));
  right: 0;
  min-width: to-rem(200);
  background: white;
  border: 1px solid var(--tgrey-200);
  border-radius: var(--radius-md);
  box-shadow: 0 to-rem(4) to-rem(6) rgba(0, 0, 0, 0.1);
  z-index: 10;
  
  ::slotted(.dropdown-item) {
    padding: to-rem(8) to-rem(16);
    cursor: pointer;
    
    &:hover {
      background-color: var(--tgrey-100);
    }
  }
}

.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: to-rem(8);
  border-radius: var(--radius-md, to-rem(20));
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &--primary {
    background: var(--primary-500);
    color: white;
    border: none;

    &:hover {
      background: var(--primary-300);
    }
  }

  &--secondary {
    background: var(--tgrey-400);
    color: white;
    border: none;

    &:hover {
      background: var(--tgrey-500);
      color: var(--primary-500);
    }
  }

  &--outline {
    background: transparent;
    border: 1px solid var(--primary-500);
    color: var(--primary-500);

    &:hover {
      background: var(--primary-500);
      color: white;
    }
  }

  &--text {
    background: transparent;
    border: none;
    color: var(--primary-500);

    &:hover {
      color: var(--primary-300);
    }
  }

  &--sm {
    padding: to-rem(8) to-rem(16);
    font-size: to-rem(14);
  }

  &--md {
    padding: to-rem(12) to-rem(24);
    font-size: to-rem(16);
  }

  &--lg {
    padding: to-rem(16) to-rem(32);
    font-size: to-rem(18);
  }

  &--block {
    width: 100%;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--loading {
    position: relative;
    cursor: wait;

    .loader {
      width: to-rem(20);
      height: to-rem(20);
      border: 2px solid currentColor;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: rotation 1s linear infinite;
    }
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
