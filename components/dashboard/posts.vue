<template>
  <div class="pt-10 md:pr-4 w-full md:max-w-[50%] h-[70vh]">
    <div class="w-full py-6 bg-white rounded-lg">
      <p class="px-4 pb-6 font-roboto text-base sm:text-xl text-primary-500">
        Latest Posts
      </p>

      <div class="space-y-3 custom-scrollbar h-80 overflow-y-auto px-4" v-if="!posts">
        <div v-for="n in 3" :key="n" class="border-b">
          <CoreSinglePost />
        </div>
      </div>

      <div class="px-4 py-4 text-base text-tgrey-500" v-else>
        <div class="w-full flex justify-center items-center pb-4">
          <Icon name="heroicons:chat-bubble-left-text" class="w-20 h-20 text-gray-200" />
        </div>
        <p>There are no Posts yet. Latest posts will be displayed here</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const posts = ref(false)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
