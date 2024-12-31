<template>
  <div>
    <div class="flex items-center w-full author__wrapper space-x-4">
      <div class="avatar">
        <DashboardCommentAvatar />
      </div>
      <div class="flex items-start justify-between author w-full">
        <div class="font-roboto">
          <p class="text-base font-semibold tracking-wide">Emeka Ugochukwu</p>
          <p class="text-xs text-tgrey-500">Teacher</p>
        </div>
        <div class="flex items-start space-x-2">
          <Icon name="mdi:clock-outline" class="w-3.5 h-3.5 text-primary-500" />
          <p class="text-[10px] tracking-wide text-roboto">Today 14:20pm</p>
        </div>
      </div>
    </div>

    <div class="py-4 w-full font-roboto text-sm tracking-wide">
      <p class="mb-6">
        <span class="font-semibold">@Ebun</span> aced all her tests today. I'm
        so proud of her growth.
      </p>
      <p
        class="flex float-right text-[10px] sm:text-xs font-roboto text-primary-500 tracking-wide cursor-pointer"
        @click="handleShowComment"
      >
        1 comment
      </p>

      <transition name="slide-down">
        <div v-if="showComments" id="comment_container">
          <div
            v-for="i in 2"
            :key="i"
            class="ml-3 border-l-2 border-b border-b-gray-50 pl-4"
          >
            <div class="py-2 flex space-x-3">
              <BaseAvatar />
              <div class="flex items-start justify-between author w-full">
                <div
                  class="font-roboto tracking-wide"
                  style="line-height: 0.8rem"
                >
                  <p class="text-[10px] font-semibold">Henry Abimbola</p>
                  <p class="text-[8px] text-tgrey-500">Guardian</p>
                </div>
                <div class="flex items-start space-x-2">
                  <Icon
                    name="mdi:clock-outline"
                    class="w-3.5 h-3.5 text-primary-500"
                  />
                  <p class="text-[10px] tracking-wide text-roboto">
                    Today 14:22pm
                  </p>
                </div>
              </div>
            </div>
            <div class="ml-9">
              <p class="w-full font-roboto text-[11px] tracking-wide">
                That's my girl!!
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="flex items-center mt-3 py-2">
      <DashboardCommentInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showComments = ref(false);

const handleShowComment = () => {
  showComments.value = !showComments.value;
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;
}

.slide-down-enter,
.slide-down-leave-to {
  max-height: 0;
}
</style>
