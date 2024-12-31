<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>School Guardians</h3>
      <custom-button @click="showform" class="add-button">
        <template #default>
          <Icon name="lucide:circle-plus" />
          Add Guardian
        </template>
      </custom-button>
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

    <GuardiansAddNewGuardian
      v-model:visible="showAddForm"
      @submit="handleAddGuardian"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const isModalVisible = ref(false);
const modalMode = ref<"view" | "edit">("view");
const selectedGuardian = ref<any>(null);
const showAddForm = ref(false);

const columns = [
  { label: "#", key: "id" },
  { label: "Full Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Relationship", key: "relationship" },
  { label: "Number of Children", key: "childrenCount" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Occupation", key: "occupation" },
  { label: "Status", key: "status" },
];

const data = ref([
  {
    id: 1,
    name: "David Johnson",
    gender: "Male",
    relationship: "Father",
    email: "david.johnson@example.com",
    phone: "555-123-4567",
    occupation: "Engineer",
    status: "Active",
    address: "123 Family Street",
    alternativeContact: "555-999-8888",
    workAddress: "456 Corporate Ave",
    preferredContactTime: "Evening",
    children: [
      {
        name: "Michael Johnson",
        class: "10A",
        rollNumber: "1001",
      },
      {
        name: "Sarah Johnson",
        class: "8B",
        rollNumber: "1002",
      },
    ],
    childrenCount: 2,
  },
  // ... existing data
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

const showform = () => {
  showAddForm.value = true;
};

const handleAddGuardian = (guardianData: any) => {
  data.value.push({
    id: data.value.length + 1,
    ...guardianData,
    childrenCount: 0,
    status: "Active",
  });
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

    .dropdown-item {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--tgrey-700);

      &:hover {
        background-color: var(--tgrey-100);
      }
    }
  }
}
</style>
