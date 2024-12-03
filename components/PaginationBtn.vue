<template>
    <nav aria-label="Page navigation" class="flex justify-center my-4">
        <ul class="inline-flex -space-x-px">
            <li>
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>
            </li>
            <li v-for="page in pages" :key="page">
                <button @click="changePage(page)" :class="{
                    'px-3 py-2 leading-tight border': true,
                    'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700': currentPage !== page,
                    'text-white bg-blue-500 border-blue-600': currentPage === page
                }">
                    {{ page }}
                </button>
            </li>
            <li>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

const props = defineProps<PaginationProps>();

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
const pages = computed(() => {
    const pagesArray = [];
    for (let i = 1; i <= totalPages.value; i++) {
        pagesArray.push(i);
    }
    return pagesArray;
});

const changePage = (page: number) => {
    if (page !== props.currentPage) {
        emit('update:currentPage', page);
    }
};

const prevPage = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
};

const nextPage = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1);
    }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>