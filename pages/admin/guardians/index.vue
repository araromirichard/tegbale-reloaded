<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>Guardians</h3>
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

    <GuardiansViewGuardianForm
      v-model:visible="isModalVisible"
      :mode="modalMode"
      :guardianData="selectedGuardian"
      @submit="handleEditSubmit"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const isModalVisible = ref(false);
const modalMode = ref<"view" | "edit">("view");
const selectedGuardian = ref<any>(null);

const columns = [
  { label: "#", key: "id" },
  { label: "Full Name", key: "name" },
  { label: "Student Name", key: "studentName" },
  { label: "Relationship", key: "relationship" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Occupation", key: "occupation" },
];

const data = ref([
  {
    id: 1,
    name: "Robert Johnson",
    studentName: "Alex Johnson",
    relationship: "Father",
    email: "robert.j@example.com",
    phone: "555-555-5555",
    occupation: "Engineer",
  },
  {
    id: 2,
    name: "Mary Williams",
    studentName: "Sarah Williams",
    relationship: "Mother",
    email: "mary.w@example.com",
    phone: "555-555-5556",
    occupation: "Doctor",
  },
]);

const viewItem = (item: any) => {
  selectedGuardian.value = item;
  modalMode.value = "view";
  isModalVisible.value = true;
};

const editItem = (item: any) => {
  selectedGuardian.value = item;
  modalMode.value = "edit";
  isModalVisible.value = true;
};

const deleteItem = (item: any) => {
  const index = data.value.findIndex((guardian) => guardian.id === item.id);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};

const handleEditSubmit = (updatedData: any) => {
  const index = data.value.findIndex(
    (guardian) => guardian.id === selectedGuardian.value.id
  );
  if (index !== -1) {
    data.value[index] = { ...data.value[index], ...updatedData };
  }
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
  }
}
</style>
