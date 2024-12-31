<template>
  <div
    class="flex items-center bg-[#e9eef2] border border-gray-50 rounded-3xl px-3 py-1 w-full hover:border-gray-200 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-200"
  >
    <div class="mr-2">
      <DashboardCommentInputAvart />
    </div>

    <input
      class="flex-1 bg-transparent border-none focus:outline-none placeholder-gray-600 text-gray-900"
      placeholder="Reply to comment"
    />

    <div class="ml-2 flex items-center">
      <button @click="sendMessage">
        <div
          class="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center"
        >
          <Icon name="heroicons:paper-airplane" class="w-4 h-4 text-white" />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const sendMessage = () => {
  // Implement message sending logic
};
</script>
