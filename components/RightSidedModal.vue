<script setup lang="ts">


const props = defineProps<{
    visible: boolean;
    header: string;
    width?: string;
}>();

//const emit = defineEmits(['update:visible']);
</script>

<template>
    <Dialog v-model:visible="props.visible" modal :header="props.header" :style="{ width: props.width || '25rem' }"
        position="right">
        <template #container="{}">
            <slot></slot>
        </template>
        <!-- <div class="flex justify-end gap-2 mt-4">
      <Button type="button" label="Cancel" severity="secondary" @click="$emit('update:visible', false)"></Button>
      <Button type="button" label="Save" @click="$emit('update:visible', false)"></Button>
    </div> -->
    </Dialog>
</template>

<style scoped>
.dialog-right {
    transform: translateX(100%);
}
</style>
