<template>
    <div class="relative inline-block text-left">
        <button @click="toggleMenu"
            class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#007bff] text-sm font-medium text-white hover:bg-[#0069d9] focus:outline-none">
            Export

            <svg class="-mr-1 ml-2 h-2 w-2" width="14" height="8" viewBox="0 0 14 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.8388 0H0.44558C0.0738597 0 -0.1337 0.392476 0.0965025 0.660416L6.29309 7.84575C6.47046 8.05142 6.81199 8.05142 6.99125 7.84575L13.1878 0.660416C13.418 0.392476 13.2105 0 12.8388 0Z"
                    fill="white" />
            </svg>

        </button>

        <div v-if="isOpen" @click="toggleMenu" class="fixed inset-0 h-full w-full z-10"></div>

        <transition name="dropdown">
            <div v-if="isOpen"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" @click="download('csv')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">CSV</a>
                    <a href="#" @click="download('pdf')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">PDF</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const download = (type) => {
    console.log(`Downloading ${type}`)
    // Add your download logic here
    isOpen.value = false
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>