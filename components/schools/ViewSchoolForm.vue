<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  mode: "view" | "edit";
  schoolData: any;
}>();

const visible = defineModel("visible", { type: Boolean, default: false });
const emit = defineEmits(["update:visible", "submit"]);

const formData = ref({ ...props.schoolData });

const closeDialog = () => {
  emit("update:visible", false);
};

const handleSubmit = () => {
  emit("submit", formData.value);
  closeDialog();
};

watch(
  () => props.schoolData,
  (newData) => {
    formData.value = { ...newData };
  },
  { deep: true }
);
</script>

<template>
  <RightSidedModal
    :visible="visible"
    :header="mode === 'view' ? 'View School Details' : 'Edit School Details'"
    width="35rem"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <h3 class="modalTitle">
        {{ mode === "view" ? "View School Details" : "Edit School Details" }}
      </h3>
    </template>

    <div class="p-4">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="form-group">
            <label>School Name</label>
            <input
              v-model="formData.name"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Location</label>
            <input
              v-model="formData.location"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              v-model="formData.email"
              type="email"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input
              v-model="formData.phone"
              type="tel"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div v-if="mode === 'edit'" class="flex justify-end gap-2 mt-12">
            <custom-button variant="secondary" @click="closeDialog"
              >Cancel</custom-button
            >
            <custom-button variant="primary" type="submit"
              >Save Changes</custom-button
            >
          </div>
        </div>
      </form>
    </div>
  </RightSidedModal>
</template>

<style scoped lang="scss">
.modalTitle {
  font-size: to-rem(20);
  font-weight: 600;
}

.form-group {
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
  }

  input {
    &[readonly] {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }
  }
}
</style>
