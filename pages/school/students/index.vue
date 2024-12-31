<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>School Students</h3>
      <div class="relative">
        <custom-button
          variant="primary"
          :has-dropdown="true"
          @click="toggleDropdown"
        >
          <Icon name="lucide:circle-plus" />
          Add Student
        </custom-button>

        <div v-show="isDropdownOpen" class="dropdown-menu" @click.stop>
          <div class="dropdown-item" @click="showform">
            Add Single Student
          </div>
          <div class="dropdown-item" @click="importStudents">
            Import Students
          </div>
        </div>
      </div>
    </section>

    <section class="mt-8">
      <CoreWrapperDatatable
        :columns="columns"
        :data="data"
        :viewItem="viewItem"
        :editItem="editItem"
        :deleteItem="deleteItem"
      />
    </section>

    <StudentsViewStudentForm
      v-model:visible="isModalVisible"
      :mode="modalMode"
      :studentData="selectedStudent"
      @submit="handleEditSubmit"
    />

    <StudentsAddNewStudent
      v-model:visible="showAddForm"
      @submit="handleAddStudent"
    />
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

definePageMeta({
  layout: "default",
});


const isModalVisible = ref(false);
const modalMode = ref<"view" | "edit">("view");
const selectedStudent = ref<any>(null);
const showAddForm = ref(false);
const isDropdownOpen = ref<boolean>(false);

// Add click outside handler
onClickOutside(ref(document.body), () => {
  if (isDropdownOpen.value) {
    isDropdownOpen.value = false;
  }
});

const columns = [
  { label: "#", key: "id" },
  { label: "Full Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Class", key: "class" },
  { label: "Roll Number", key: "rollNumber" },
  { label: "Parent Name", key: "parentName" },
  { label: "Contact", key: "contact" },
  { label: "Status", key: "status" },
  { label: "Admission Date", key: "admissionDate" },
];

const data = ref([
  {
    id: 1,
    name: "Michael Johnson",
    gender: "Male",
    class: "10A",
    rollNumber: "1001",
    parentName: "David Johnson",
    contact: "555-123-4567",
    status: "Active",
    admissionDate: "2022-09-01",
    age: 15,
    bloodGroup: "O+",
    address: "123 Student Lane",
    academicPerformance: "Excellent",
    extracurriculars: ["Football", "Debate Club"],
  },
  // ... existing data
]);

const viewItem = (item: any) => {
  selectedStudent.value = item;
  modalMode.value = "view";
  isModalVisible.value = true;
};

const editItem = (item: any) => {
  selectedStudent.value = item;
  modalMode.value = "edit";
  isModalVisible.value = true;
};

const deleteItem = (item: any) => {
  const index = data.value.findIndex((student) => student.id === item.id);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};

const showform = () => {
  showAddForm.value = true;
};

const handleAddStudent = (studentData: any) => {
  data.value.push({
    id: data.value.length + 1,
    ...studentData,
    status: "Active",
  });
};

const handleEditSubmit = (updatedData: any) => {
  const index = data.value.findIndex(
    (student) => student.id === selectedStudent.value.id
  );
  if (index !== -1) {
    data.value[index] = { ...data.value[index], ...updatedData };
  }
};

const importStudents = () => {
  // Implement import logic
};

const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style lang="scss">
.page-container {
  @include page-padding;

  .title__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: to-rem(30);
      font-weight: 500;
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      background: white;
      border: 1px solid var(--tgrey-200);
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 50;
      min-width: 200px;
      transition: all 0.2s ease;
    }
    .dropdown-item {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--tgrey-700);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--tgrey-100);
        color: var(--primary-500);
        transform: translateX(4px);
      }
    }
  }
}
</style>
