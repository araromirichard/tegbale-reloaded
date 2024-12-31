<script lang="ts" setup>
import { useAttrs } from "vue";
const attrs = useAttrs() as any;
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Array<any>],
    default: () => [],
  },
  border: {
    type: String,
    default: "0.2px solid rgba(128, 128, 128, 0.5)",
  },
  suffix: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "",
  },

  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "44px",
  },
  backgroundColor: {
    type: String,
    default: "transparent",
  },
  color: {
    type: String,
    default: "#0D0A0B",
  },
  inKobo: {
    type: Boolean,
    default: true,
  },
});

defineOptions({
  inheritAttrs: false,
});

const [model, modifiers] = defineModel({
  set(value: any) {
    if (modifiers.money || (attrs.type === "money" && value)) {
      return prepareMoneyValues(value, "set");
    } else {
      const val = value;
      return val === 0 || val === "0" ? "" : val;
    }
  },
  get(value: any) {
    if (modifiers.money || (attrs.type === "money" && value)) {
      return prepareMoneyValues(value, "get");
    } else {
      const val = value;

      return val === 0 || val === "0" ? "" : val;
    }
  },
});

const inputRef = ref<HTMLInputElement | null>(null);

const isPrefixIcon = computed(() => {
  return props.prefix.startsWith("app-icon:");
});

const isPrefixClickable = computed(() => {
  return !!hasPropsOrEvents("onPrefixClick");
});

const isSuffixIcon = computed(() => {
  return props.suffix.startsWith("app-icon:");
});
const isSuffixClickable = computed(() => {
  return !!hasPropsOrEvents("onSuffixClick");
});

const convertToCommaSeparated = (value: string | number) => {
  return value
    .toString()
    .replace(/,/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const prepareMoneyValues = (value: any, which: "get" | "set") => {
  if (which === "get") {
    const parsedValue =
      typeof value === "number" ? value : parseFloat(value.replace(/,/g, ""));
    logger(parsedValue, isNaN(parsedValue));
    return isNaN(parsedValue)
      ? ""
      : convertToCommaSeparated(parsedValue / (props.inKobo ? 100 : 1));
  } else {
    const parsedValue =
      typeof value === "number" ? value : parseFloat(value.replace(/,/g, ""));
    return isNaN(parsedValue) ? "" : parsedValue * (props.inKobo ? 100 : 1);
  }
};

const emits = defineEmits({
  "suffix-click": (e: Event) => true,
  "prefix-click": (e: Event) => true,
});

const setFocus = () => {
  inputRef.value?.focus();
};

defineExpose({
  setFocus,
});
</script>

<template>
  <div class="custom-input">
    <slot name="label">
      <label v-if="props.label" class="custom-input__label">{{
        props.label
      }}</label>
    </slot>
    <div
      class="custom-input__area"
      :style="{
        ...attrs.style,
      }"
      :class="{
        disabled: disabled,
      }"
    >
      <slot name="prefix">
        <div
          class="prefix"
          @click="emits('prefix-click', $event)"
          :class="{ clickable: isPrefixClickable }"
        >
          <slot name="prefix-content" v-if="isPrefixIcon">
            <app-icon
              :name="props.prefix.replace('app-icon:', '').split('|')[0]"
              :style="{
                color: props.prefix.replace('app-icon:', '').split('|')[1],
              }"
            />
          </slot>
          <template v-else>{{ props.prefix }}</template>
        </div>
      </slot>
      <slot name="input">
        <input
          ref="inputRef"
          v-bind="$attrs"
          v-model="model"
          :placeholder="placeholder"
          :disabled="disabled"
        />
      </slot>
      <slot name="suffix">
        <div
          class="suffix"
          @click="emits('suffix-click', $event)"
          :class="{ clickable: isSuffixClickable }"
        >
          <slot name="suffix-content">
            <app-icon
              v-if="isSuffixIcon"
              :name="props.suffix.replace('app-icon:', '').split('|')[0]"
              :style="{
                color: props.suffix.replace('app-icon:', '').split('|')[1],
              }"
            />
            <template v-else>{{ props.suffix }}</template>
          </slot>
        </div>
      </slot>
    </div>

    <transition name="modal-anim">
      <slot v-if="!props.error || !props.error.length" name="description">
        <span class="custom-input__description">{{ props.description }}</span>
      </slot>
    </transition>

    <transition name="modal-anim">
      <slot v-if="error" name="error">
        <span class="custom-input__error">
          {{
            props.error && Array.isArray(props.error)
              ? props.error[0]?.$message
              : props.error
          }}
        </span>
      </slot>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.custom-input {
  flex: 1;
  width: v-bind("props.width");
  display: flex;
  flex-direction: column;
  gap: to-rem(10);
  color: v-bind("props.color");
  @include no-select;

  &__label {
    font-size: to-rem(15);
    font-weight: 600;
    color: get-color("grey", 400);
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.28px;
    text-align: left !important;
    @include selection;
    display: block;
  }

  &__area {
    display: flex;
    align-items: center;
    border: v-bind("props.border");
    border-radius: map-get($radius, "lg");
    padding: to-rem(12);
    box-sizing: border-box;
    gap: to-rem(12);
    font-size: to-rem(12);
    font-weight: 400;
    line-height: to-rem(0);
    letter-spacing: to-rem(-0.28);
    height: v-bind("props.height");
    background-color: v-bind("props.backgroundColor");

    input {
      flex: 1;
      max-width: 100%;
      border: none;
      font-size: inherit;
      font-weight: inherit;
      line-height: 0 !important;
      padding: 0 !important;
      letter-spacing: inherit;
      background-color: inherit;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      outline-style: none;
      transition: border-color map-get($transitions, "base");
      @include text-font;

      &:focus {
        outline: none;
        border-color: get-color("primary", 500);
      }

      &:hover {
        border-color: rgba(0, 0, 0, 0.6);

        &:focus {
          outline: none;
          border-color: get-color("primary", 500);
        }
      }

      &::placeholder {
        color: get-color("grey", 400);
        font-size: to-rem(13);
        font-weight: 400;
      }
    }

    .suffix,
    .prefix {
      display: flex;
      align-items: center;
      justify-items: center;
      color: inherit;
      transition: all map-get($transitions, "base");

      &.clickable {
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }

    &.disabled {
      opacity: 0.9;
      color: var(--tgrey-400);
      background-color: var(--tgrey-500);
      border-color: rgba(136, 136, 136, 0.5);
      @include no-select;
    }
  }

  &__description {
    text-align: left !important;
    display: block;
    font-size: to-rem(12) !important;
    color: get-color("grey", 400);
    @include selection;
    margin-top: 5px;
  }

  &__error {
    text-align: left !important;
    display: block;
    padding: 0;
    margin: 0;
    font-size: to-rem(14);
    color: get-color("danger", 500);
  }
}
</style>
