<template>
  <div class="table__container">
    <div class="mb-4 flex justify-between items-center">
      <input v-model="searchQuery" type="text" placeholder="Search..."
        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <!-- Any other content or controls can go here -->
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-gray-700 text-nowrap uppercase bg-white">
        <tr>
          <th v-for="column in columns" :key="column.key" scope="col" class="px-6 py-5">{{ column.label }}</th>
          <th scope="col" class="px-6 py-5 flex justify-center">
            <DropdownBtn />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id"
          class="bg-white border-t hover:bg-gray-50 text-nowrap font-medium">
          <td v-for="column in columns" :key="column.key" scope="row"
            class="px-6 py-2 text-gray-900 whitespace-nowrap space-x-2">
            {{ item[column.key] }}
          </td>
          <td class="px-6 py-2 flex justify-center items-center space-x-2">
            <span class="p-1 bg-slate-50 rounded-full border-transparent shadow-sm hover:bg-blue-100 cursor-pointer"
              @click="viewItem(item)">
              <Icon name="lucide:eye" />
            </span>
            <span class="p-1 bg-slate-50 rounded-full border-transparent shadow-sm hover:bg-green-100 cursor-pointer"
              @click="editItem(item)">
              <Icon name="lucide:pen" />
            </span>
            <span class="p-1 bg-slate-50 rounded-full border-transparent shadow-sm hover:bg-red-100 cursor-pointer"
              @click="deleteItem(item)">
              <Icon name="lucide:trash" />
            </span>
          </td>
        </tr>
        <tr v-if="paginatedData.length === 0">
          <td :colspan="columns.length + 1" class="text-center py-6 text-lg text-primary-500 font-semibold">No data
            available.</td>
        </tr>
      </tbody>
    </table>

  </div>
  <PaginationBtn :totalItems="filteredData.length" :itemsPerPage="itemsPerPage" v-model:currentPage="currentPage" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Column {
  label: string;
  key: string;
}

const props = defineProps<{
  columns: Column[];
  data: any[];
  viewItem: (item: any) => void;
  editItem: (item: any) => void;
  deleteItem: (item: any) => void;
}>();

const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref('');

const filteredData = computed(() => {
  if (!searchQuery.value) return props.data;

  const query = searchQuery.value.toLowerCase();
  return props.data.filter(item =>
    props.columns.some(column =>
      String(item[column.key]).toLowerCase().includes(query)
    )
  );
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});
</script>

<style lang="scss" scoped>
.table__container {
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
  background-color: #f9f8f8;

  // Custom Scrollbar Styles
  &::-webkit-scrollbar {
    height: 4px; // height for horizontal scrollbar
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b0bec5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #90a4ae;
  }

  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
  }

  table {
    min-width: 100%;
    background-color: #fff;

    th {
      font-size: to-rem(12);
      font-weight: 600;
      letter-spacing: 2px;
    }

    td {
      font-size: to-rem(12);

      span {
        font-size: to-rem(12);
      }
    }
  }
}

input[type="text"] {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
}
</style>
