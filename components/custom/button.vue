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
});

const buttonClasses = computed(() => ({
  "custom-button": true,
  [`custom-button--${props.variant}`]: true,
  [`custom-button--${props.size}`]: true,
  "custom-button--block": props.block,
  "custom-button--loading": props.loading,
  "custom-button--disabled": props.disabled,
}));
</script>

<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled || loading">
    <span v-if="loading" class="loader"></span>
    <span v-else class="button-content">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
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
