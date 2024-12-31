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
  relationship: "",
  email: "",
  phone: "",
  occupation: "",
  address: "",
  alternativeContact: "",
  workAddress: "",
  preferredContactTime: "",
});

const closeDialog = () => {
  emits("update:visible", false);
  formData.value = {
    name: "",
    gender: "",
    relationship: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
    alternativeContact: "",
    workAddress: "",
    preferredContactTime: "",
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
      <h3 class="modalTitle">Add New Guardian</h3>
    </template>

    <template #body>
      <form class="add-guardian-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <custom-input
            v-model="formData.name"
            label="Full Name"
            placeholder="Enter guardian's full name"
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
            v-model="formData.relationship"
            label="Relationship"
            placeholder="Enter relationship to student"
            required
          />

          <custom-input
            v-model="formData.occupation"
            label="Occupation"
            placeholder="Enter occupation"
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
            v-model="formData.address"
            label="Address"
            placeholder="Enter residential address"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.workAddress"
            label="Work Address"
            placeholder="Enter work address"
          />

          <custom-input
            v-model="formData.alternativeContact"
            label="Alternative Contact"
            type="tel"
            placeholder="Enter alternative contact"
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.preferredContactTime"
            label="Preferred Contact Time"
            placeholder="Enter preferred contact time"
          />
        </div>

        <div class="button-group">
          <custom-button variant="secondary" color="white" @click="closeDialog">
            Cancel
          </custom-button>

          <custom-button variant="primary" type="submit">
            Add Guardian
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

.add-guardian-form {
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
