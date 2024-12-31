<template>
    <div class="page-container">
      <section class="title__wrapper">
        <h3>Teachers</h3>
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
  
      <TeachersViewTeacherForm
        v-model:visible="isModalVisible"
        :mode="modalMode"
        :teacherData="selectedTeacher"
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
  const selectedTeacher = ref<any>(null);
  
  const columns = [
    { label: "#", key: "id" },
    { label: "Full Name", key: "name" },
    { label: "School", key: "school" },
    { label: "Subject", key: "subject" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Join Date", key: "joinDate" },
  ];
  
  const data = ref([
    {
      id: 1,
      name: "John Smith",
      school: "Springfield Elementary",
      subject: "Mathematics",
      email: "john.smith@example.com",
      phone: "555-555-5555",
      joinDate: "2020-09-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      school: "Shelbyville High",
      subject: "English",
      email: "jane.doe@example.com",
      phone: "555-555-5556",
      joinDate: "2019-08-15",
    },
  ]);
  
  const viewItem = (item: any) => {
    selectedTeacher.value = item;
    modalMode.value = "view";
    isModalVisible.value = true;
  };
  
  const editItem = (item: any) => {
    selectedTeacher.value = item;
    modalMode.value = "edit";
    isModalVisible.value = true;
  };
  
  const deleteItem = (item: any) => {
    const index = data.value.findIndex((teacher) => teacher.id === item.id);
    if (index !== -1) {
      data.value.splice(index, 1);
    }
  };
  
  const handleEditSubmit = (updatedData: any) => {
    const index = data.value.findIndex(
      (teacher) => teacher.id === selectedTeacher.value.id
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
  