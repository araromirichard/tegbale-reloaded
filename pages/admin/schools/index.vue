<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>Schools</h3>
      <div>
        <custom-button variant="primary" @click="showform">
          <Icon name="lucide:circle-plus" />
          Add School
        </custom-button>
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

    <SchoolsViewSchoolForm
      v-model:visible="isModalVisible"
      :mode="modalMode"
      :schoolData="selectedSchool"
      @submit="handleEditSubmit"
    />

    <SchoolsAddSchoolForm
      v-model:visible="showAddForm"
      @submit="handleAddSchool"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const showAddForm = ref(false);
const isModalVisible = ref(false);
const modalMode = ref<"view" | "edit">("view");
const selectedSchool = ref<any>(null);

const columns = [
  { label: "#", key: "id" },
  { label: "School Name", key: "name" },
  { label: "Location", key: "location" },
  { label: "Number of Students", key: "students" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Established", key: "established" },
];

const data = ref([
  {
    id: 1,
    name: "Springfield Elementary",
    location: "Springfield",
    students: 500,
    email: "springfield@example.com",
    phone: "555-555-5555",
    established: "1990",
  },
  {
    id: 2,
    name: "Shelbyville High",
    location: "Shelbyville",
    students: 800,
    email: "shelbyville@example.com",
    phone: "555-555-5555",
    established: "1985",
  },
]);

const handleAddSchool = (schoolData: any) => {
  data.value.push({
    id: data.value.length + 1,
    ...schoolData,
    students: 0,
  });
};

const viewItem = (item: any) => {
  selectedSchool.value = item;
  modalMode.value = "view";
  isModalVisible.value = true;
  console.log(isModalVisible.value);
};

const editItem = (item: any) => {
  selectedSchool.value = item;
  modalMode.value = "edit";
  isModalVisible.value = true;
};

const deleteItem = (item: any) => {
  // Implement delete logic here
  const index = data.value.findIndex((school) => school.id === item.id);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};

const showform = () => {
  showAddForm.value = true;
  //console.log(showAddForm.value);
};

const handleEditSubmit = (updatedData: any) => {
  const index = data.value.findIndex(
    (school) => school.id === selectedSchool.value.id
  );
  if (index !== -1) {
    data.value[index] = { ...data.value[index], ...updatedData };
  }
};
</script>

<style lang="scss">
.page-container {
  @include page-padding;
  // @include body-font;

  .title__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: to-rem(30);
      font-weight: 500;
    }

    .add-button {
      display: flex;
      align-items: center;
      gap: to-rem(8);
      font-size: to-rem(14);
      padding: to-rem(8) to-rem(12);
      border-radius: to-rem(6);
      background-color: #007bff;
      color: #fff;
      border: transparent;

      &:hover {
        background-color: #0069d9;
      }
    }
  }
}
</style>
