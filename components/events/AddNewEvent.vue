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
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  organizer: "",
  type: "",
  maxParticipants: "",
});

const closeDialog = () => {
  emits("update:visible", false);
  formData.value = {
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    organizer: "",
    type: "",
    maxParticipants: "",
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
      <h3 class="modalTitle">Add New Event</h3>
    </template>

    <template #body>
      <form class="add-event-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <custom-input
            v-model="formData.title"
            label="Event Title"
            placeholder="Enter event title"
            required
          />

          <custom-input
            v-model="formData.type"
            label="Event Type"
            placeholder="Enter event type"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.date"
            label="Date"
            type="date"
            suffix="app-icon:calendar|#808080"
            required
          />

          <custom-input
            v-model="formData.time"
            label="Time"
            type="time"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.location"
            label="Location"
            placeholder="Enter event location"
            required
          />

          <custom-input
            v-model="formData.maxParticipants"
            label="Maximum Participants"
            type="number"
            placeholder="Enter max participants"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.organizer"
            label="Organizer"
            placeholder="Enter organizer name"
            required
          />
        </div>

        <div class="form-row">
          <custom-input
            v-model="formData.description"
            label="Description"
            type="textarea"
            placeholder="Enter event description"
            required
          />
        </div>

        <div class="button-group">
          <custom-button variant="secondary" color="white" @click="closeDialog">
            Cancel
          </custom-button>

          <custom-button variant="primary" type="submit">
            Add Event
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

.add-event-form {
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
