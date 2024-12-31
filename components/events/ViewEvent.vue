<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  mode: "view" | "edit";
  eventData: any;
}>();

const visible = defineModel("visible", { type: Boolean, default: false });
const emit = defineEmits(["update:visible", "submit"]);

const formData = ref({ ...props.eventData });

const closeDialog = () => {
  emit("update:visible", false);
};

const handleSubmit = () => {
  emit("submit", formData.value);
  closeDialog();
};

watch(
  () => props.eventData,
  (newData) => {
    formData.value = { ...newData };
  },
  { deep: true }
);
</script>

<template>
  <RightSidedModal
    :visible="visible"
    :header="mode === 'view' ? 'View Event Details' : 'Edit Event Details'"
    width="35rem"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <h3 class="modalTitle">
        {{ mode === "view" ? "View Event Details" : "Edit Event Details" }}
      </h3>
    </template>

    <div class="p-4">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="form-group">
            <label>Event Name</label>
            <input
              v-model="formData.name"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Category</label>
            <input
              v-model="formData.category"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Date</label>
            <input
              v-model="formData.date"
              type="date"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Time</label>
            <input
              v-model="formData.time"
              type="time"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Venue</label>
            <input
              v-model="formData.venue"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Coordinator</label>
            <input
              v-model="formData.coordinator"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="formData.description"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Budget</label>
            <input
              v-model="formData.budget"
              type="number"
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

  input,
  textarea {
    &[readonly] {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }
  }
}
</style>
