<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>School Classrooms</h3>
      <div class="relative">
        <custom-button
          variant="primary"
          :has-dropdown="true"
          @click="toggleDropdown"
        >
          <Icon name="lucide:circle-plus" />
          Add Classroom
        </custom-button>

        <div v-show="isDropdownOpen" class="dropdown-menu" @click.stop>
          <div class="dropdown-item" @click="showform">
            Add Single Classroom
          </div>
          <div class="dropdown-item" @click="importClassrooms">
            Import Classrooms
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

    <ClassroomsViewClassroomForm
      v-model:visible="isModalVisible"
      :mode="modalMode"
      :classroomData="selectedClassroom"
      @submit="handleEditSubmit"
    />

    <ClassroomsAddNewClassroom
      v-model:visible="showAddForm"
      @submit="handleAddClassroom"
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
const selectedClassroom = ref<any>(null);
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
  { label: "Class Name", key: "className" },
  { label: "Section", key: "section" },
  { label: "Class Teacher", key: "classTeacher" },
  { label: "Total Students", key: "totalStudents" },
  { label: "Room Number", key: "roomNumber" },
  { label: "Floor", key: "floor" },
  { label: "Academic Year", key: "academicYear" },
  { label: "Status", key: "status" },
];

const data = ref([
  {
    id: 1,
    className: "10",
    section: "A",
    classTeacher: "John Smith",
    totalStudents: 35,
    roomNumber: "201",
    floor: "2nd Floor",
    academicYear: "2023-2024",
    status: "Active",
    schedule: [
      { day: "Monday", subjects: ["Math", "Physics", "English", "History"] },
      {
        day: "Tuesday",
        subjects: ["Chemistry", "Biology", "Literature", "Art"],
      },
    ],
    students: [
      { id: 1, name: "Alice Johnson", rollNumber: "1001" },
      { id: 2, name: "Bob Wilson", rollNumber: "1002" },
    ],
    subjects: [
      { name: "Mathematics", teacher: "John Smith", hoursPerWeek: 6 },
      { name: "Physics", teacher: "Sarah Connor", hoursPerWeek: 4 },
    ],
    capacity: 40,
    facilities: ["Smart Board", "Projector", "AC"],
  },
  {
    id: 2,
    className: "11",
    section: "B",
    classTeacher: "Mary Williams",
    totalStudents: 32,
    roomNumber: "301",
    floor: "3rd Floor",
    academicYear: "2023-2024",
    status: "Active",
    schedule: [
      { day: "Monday", subjects: ["English", "Chemistry", "Math", "Physics"] },
      {
        day: "Tuesday",
        subjects: ["Biology", "Computer Science", "History", "PE"],
      },
    ],
    students: [
      { id: 3, name: "Carol Smith", rollNumber: "1003" },
      { id: 4, name: "David Brown", rollNumber: "1004" },
    ],
    subjects: [
      { name: "Chemistry", teacher: "Mary Williams", hoursPerWeek: 5 },
      { name: "Biology", teacher: "James Wilson", hoursPerWeek: 4 },
    ],
    capacity: 40,
    facilities: ["Smart Board", "Lab Equipment", "AC"],
  },
]);

const viewItem = (item: any) => {
  selectedClassroom.value = item;
  modalMode.value = "view";
  isModalVisible.value = true;
};

const editItem = (item: any) => {
  selectedClassroom.value = item;
  modalMode.value = "edit";
  isModalVisible.value = true;
};

const deleteItem = (item: any) => {
  const index = data.value.findIndex((classroom) => classroom.id === item.id);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};

const handleEditSubmit = (updatedData: any) => {
  const index = data.value.findIndex(
    (classroom) => classroom.id === selectedClassroom.value.id
  );
  if (index !== -1) {
    data.value[index] = { ...data.value[index], ...updatedData };
  }
};

const showform = () => {
  showAddForm.value = true;
  //console.log(showAddForm.value);
};

const handleAddClassroom = (classData: any) => {
  data.value.push({
    id: data.value.length + 1,
    ...classData,
    students: 0,
  });
};

const importClassrooms = () => {
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
