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
  location: "",
  email: "",
  phone: "",
  admin: "",
});

const closeDialog = () => {
  emits("update:visible", false);
  formData.value = {
    name: "",
    location: "",
    email: "",
    phone: "",
    admin: "",
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
      <h3 class="modalTitle">Add New School</h3>
    </template>

    <template #body>
      <form class="add-school-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <custom-input
            v-model="formData.name"
            label="School Name"
            placeholder="Enter school name"
            required
          />

          <custom-input
            v-model="formData.location"
            label="Location"
            placeholder="Enter school location"
            required
          />
        </div>

        <div>
          <label>Admin Information</label>
          <div class="form-row">
            <custom-input
              v-model="formData.admin"
              label="Name"
              placeholder="Enter admin name"
              required
            />
          </div>

          <div class="form-row">
            <custom-input
              v-model="formData.email"
              label="Email"
              type="email"
              placeholder="Enter admin email"
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
        </div>

        <div class="button-group">
          <custom-button variant="secondary" color="white" @click="closeDialog">
            Cancel
          </custom-button>

          <custom-button variant="primary" type="submit">
            Add School
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

.add-school-form {
  padding: to-rem(16);

  .form-row {
    display: flex;
    gap: to-rem(16);
    margin-bottom: to-rem(4);

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
