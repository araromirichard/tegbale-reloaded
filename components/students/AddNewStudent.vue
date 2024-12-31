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
  name: "",
  gender: "",
  class: "",
  rollNumber: "",
  parentName: "",
  contact: "",
  admissionDate: "",
  bloodGroup: "",
  address: "",
  age: "",
  email: "",
});

const closeDialog = () => {
  emits("update:visible", false);
  formData.value = {
    name: "",
    gender: "",
    class: "",
    rollNumber: "",
    parentName: "",
    contact: "",
    admissionDate: "",
    bloodGroup: "",
    address: "",
    age: "",
    email: "",
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
      <h3 class="modalTitle">Add New Student</h3>
    </template>

    <template #body>
      <form class="add-student-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <custom-input
            v-model="formData.name"
            label="Full Name"
            placeholder="Enter student's full name"
            required
          />

          <custom-input
            v-model="formData.gender"
            label="Gender"
            placeholder="Enter gender"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.class"
            label="Class"
            placeholder="Enter class"
            required
          />

          <custom-input
            v-model="formData.rollNumber"
            label="Roll Number"
            placeholder="Enter roll number"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.parentName"
            label="Parent Name"
            placeholder="Enter parent's name"
            required
          />

          <custom-input
            v-model="formData.contact"
            label="Contact"
            type="tel"
            placeholder="Enter contact number"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.email"
            label="Email"
            type="email"
            placeholder="Enter email address"
          />

          <custom-input
            v-model="formData.age"
            label="Age"
            type="number"
            placeholder="Enter age"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.bloodGroup"
            label="Blood Group"
            placeholder="Enter blood group"
          />

          <custom-input
            v-model="formData.admissionDate"
            label="Admission Date"
            type="date"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.address"
            label="Address"
            placeholder="Enter address"
            required
          />
        </div>

        <div class="button-group">
          <custom-button variant="secondary" color="white" @click="closeDialog">
            Cancel
          </custom-button>

          <custom-button variant="primary" type="submit">
            Add Student
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

.add-student-form {
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
