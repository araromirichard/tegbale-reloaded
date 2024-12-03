<script setup lang="ts"></script>
<template>
    <div class="max-w-[1400px] w-full mx-auto min-h-[100vh] flex">
        <aside class="hidden md:flex items-center justify-center relative bg-cover w-2/5 text-center"
            :style="{ backgroundImage: 'url(/core/schoolicons.png)' }">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black opacity-70"></div>
            <!-- Logo -->
            <div class="relative z-10">
                <img src="/brand/tegbale-logo.png" alt="tegbale logo" class="w-24 h-24 object-contain" /><br>
                <span class="text-white text-4xl font-medium">Welcome to Tegbale</span>
            </div>
        </aside>

        <main class="flex items-center justify-center w-full md:w-3/5">
            <div class="flex flex-col items-center justify-center w-full">
                <slot />
            </div>
        </main>
    </div>
</template>