<template>
  <div class="search-container">
    <div class="search-input-container">
      <Icon name="lucide:search" class="search-icon" />
      <input type="text" placeholder="Search..." v-model="searchQuery" @input="handleInput"
        @keydown.enter="handleSearch" class="search-input" aria-label="Search input" />
    </div>

  </div>
</template>

<script setup lang="ts">

const searchQuery = ref('');
const emit = defineEmits(['collapse']);

const handleInput = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value;
};

const handleSearch = () => {
  // Handle search logic here

  // Reset search query and emit collapse event
  searchQuery.value = '';
  emit('collapse');
};
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  align-items: center;
  max-width: 400px;
  width: 400px;
  margin: 0 auto;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  flex-grow: 1;
  padding: 8px;
  padding-left: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 8px;
  pointer-events: none;
  /* Prevents icon from receiving click events */
  z-index: 1;
  /* Ensures icon is above input */
}
</style>
