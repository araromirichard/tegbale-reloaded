<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>Schools</h3>
      <Button class="add-button" @click="openDialog">
        <Icon name="lucide:circle-plus" />

        Add School
      </Button>
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
  </div>

  <div>
    <RightSidedModal
      :visible="isModalVisible"
      @update:visible="isModalVisible = $event"
      header="Edit Profile"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
      </div>
    </RightSidedModal>
  </div>
  <MyDialog ref="dialogRef" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

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
const isModalVisible = ref(false);
const dialogRef = ref();

// const openModal = () => {
//     isModalVisible.value = true;
// };

const openDialog = () => {
  dialogRef.value.visible = true;
};
const closeModal = () => {
  isModalVisible.value = false;
};
const viewItem = (item: any) => {
  console.log("Viewing item", item);
  isModalVisible.value = true;
};

const editItem = (item: any) => {
  console.log("Editing item", item);
};

const deleteItem = (item: any) => {
  console.log("Deleting item", item);
};
</script>

<style scoped lang="scss">
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

  .table__container {
    width: 100%;
    overflow-x: auto;
    padding: to-;
    background-color: #f9f8f8;

    table {
      min-width: 100%;
      background-color: #fff;

      th {
        font-size: to-rem(12);
      }

      td {
        font-size: to-rem(12);

        span {
          font-size: to-rem(12);
        }
      }
    }
  }

  .dialog-right {
    transform: translateX(100%);
  }
}

// Responsive styles
@media (min-width: to-rem(768)) {
  // Tablets
  .page-container {
    .title__wrapper h3 {
      font-size: to-rem(22);
    }

    .add-button {
      font-size: to-rem(16);
      padding: to-rem(12) to-rem(16);
    }

    .table__container {
      padding: to-rem(24);

      table th,
      table td,
      table td span {
        font-size: to-rem(14);
      }
    }
  }
}

@media (min-width: to-rem(1024)) {
  // Laptops
  .page-container {
    .title__wrapper h3 {
      font-size: to-rem(24);
    }

    .add-button {
      font-size: to-rem(18);
      padding: to-rem(16) to-rem(20);
    }

    .table__container {
      padding: to-rem(32);

      table th,
      table td,
      table td span {
        font-size: to-rem(16);
      }
    }
  }
}

@media (min-width: 1280px) {
  // Desktops
  .page-container {
    .title__wrapper h3 {
      font-size: to-rem(26);
    }

    .add-button {
      font-size: to-rem(20);
      padding: to-rem(20) to-rem(24);
    }

    .table__container {
      padding: to-rem(40);

      table th,
      table td,
      table td span {
        font-size: to-rem(18);
      }
    }
  }
}
</style>
