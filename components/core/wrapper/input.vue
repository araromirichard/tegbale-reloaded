<script lang="ts" setup>
defineProps({
    label: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    error: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div class="wrapper-input">
        <slot name="label">
            <label v-if="label" class="wrapper-input__label">{{ label }}</label>
        </slot>
        <slot></slot>
        <slot v-if="!error" name="description">
            <span v-if="description" class="wrapper-input__description">{{
                description
            }}</span>
        </slot>
        <slot name="error">
            <span v-if="error" class="wrapper-input__error" role="alert">{{
                error
            }}</span>
        </slot>
    </div>
</template>
<style lang="scss">
.wrapper-input {
    width: auto;
}
</style>
