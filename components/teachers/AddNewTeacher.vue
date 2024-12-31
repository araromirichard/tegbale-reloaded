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
  role: "",
  subject: "",
  email: "",
  phone: "",
  experience: "",
  joinDate: new Date().toISOString().split("T")[0], // Sets default to current date
  qualification: "",
  specialization: "",
});

const closeDialog = () => {
  emits("update:visible", false);
  formData.value = {
    name: "",
    gender: "",
    role: "",
    subject: "",
    email: "",
    phone: "",
    experience: "",
    joinDate: "",
    qualification: "",
    specialization: "",
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
      <h3 class="modalTitle">Add New Teacher</h3>
    </template>

    <template #body>
      <form class="add-teacher-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <custom-input
            v-model="formData.name"
            label="Full Name"
            placeholder="Enter teacher's full name"
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
            v-model="formData.role"
            label="Role"
            placeholder="Enter role"
            required
          />

          <custom-input
            v-model="formData.subject"
            label="Subject"
            placeholder="Enter subject"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.email"
            label="Email"
            type="email"
            placeholder="Enter email address"
            required
          />

          <custom-input
            v-model="formData.phone"
            label="Phone"
            type="tel"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.experience"
            label="Experience"
            placeholder="Enter years of experience"
            required
          />

          <!-- Replace the existing date input with: -->
          <custom-input
            v-model="formData.joinDate"
            label="Join Date"
            type="date"
            :min="'2000-01-01'"
            :max="new Date().toISOString().split('T')[0]"
            suffix="app-icon:calendar|#808080"
            required
          />
        </div>
        <div class="form-row">
          <custom-input
            v-model="formData.qualification"
            label="Qualification"
            placeholder="Enter qualification"
            required
          />

          <custom-input
            v-model="formData.specialization"
            label="Specialization"
            placeholder="Enter specialization"
            required
          />
        </div>

        <div class="button-group">
          <custom-button variant="secondary" color="white" @click="closeDialog">
            Cancel
          </custom-button>

          <custom-button variant="primary" type="submit">
            Add Teacher
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

.add-teacher-form {
  padding: to-rem(16);

  .form-row {
    display: flex;
    gap: to-rem(16);
    margin-bottom: to-rem(16);

    input[type="date"] {
      color: #000;
      background-color: #fff;
      padding: to-rem(8);
      width: 100%;
      border: 1px solid #ccc;
      border-radius: to-rem(4);

      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.8;
      }
    }

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
