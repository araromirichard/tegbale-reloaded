<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const visible = defineModel("visible", { type: Boolean, default: false });
const emits = defineEmits(["update:visible", "submit"]);

const formData = ref({
  className: "",
  section: "",
  classTeacher: "",
  roomNumber: "",
  floor: "",
  academicYear: "",
  capacity: "",
});

const closeDialog = () => {
  emits("update:visible", false);
  formData.value = {
    className: "",
    section: "",
    classTeacher: "",
    roomNumber: "",
    floor: "",
    academicYear: "",
    capacity: "",
  };
};

const handleSubmit = () => {
  emits("submit", formData.value);
  closeDialog();
};
</script>

<template>
  <MyDialog v-model="visible">
    <template #header>
      <h3 class="modalTitle">Add New Classroom</h3>
    </template>

    <template #body>
      <form class="add-classroom-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <custom-input
            v-model="formData.className"
            label="Class Name"
            placeholder="Enter class name"
            required
          />

          <custom-input
            v-model="formData.section"
            label="Section"
            placeholder="Enter section"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.classTeacher"
            label="Class Teacher"
            placeholder="Enter class teacher name"
            required
          />

          <custom-input
            v-model="formData.roomNumber"
            label="Room Number"
            placeholder="Enter room number"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.floor"
            label="Floor"
            placeholder="Enter floor"
            required
          />

          <custom-input
            v-model="formData.academicYear"
            label="Academic Year"
            placeholder="Enter academic year"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.capacity"
            label="Capacity"
            type="number"
            placeholder="Enter classroom capacity"
            required
          />
        </div>

        <div class="button-group">
          <custom-button variant="secondary" color="white" @click="closeDialog">
            Cancel
          </custom-button>

          <custom-button variant="primary" type="submit">
            Add Classroom
          </custom-button>
        </div>
      </form>
    </template>
  </MyDialog>
</template>

<style lang="scss" scoped>
.modalTitle {
  font-size: to-rem(20);
  font-weight: 600;
}

.add-classroom-form {
  padding: to-rem(16);

  .form-row {
    display: flex;
    gap: to-rem(16);
    margin-bottom: to-rem(16);

    @media (max-width: 768px) {
      flex-direction: column;
      gap: to-rem(16);
    }
  }

  .button-group {
    margin-top: to-rem(24);
    display: flex;
    justify-content: flex-end;
    gap: to-rem(12);
  }
}
</style>
