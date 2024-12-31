<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>School Events</h3>
      <custom-button @click="showform" class="add-button">
        <template #default>
          <Icon name="lucide:circle-plus" />
          Add Event
        </template>
      </custom-button>
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

    <EventsViewEvent
      v-model:visible="isModalVisible"
      :mode="modalMode"
      :eventData="selectedEvent"
      @submit="handleEditSubmit"
    />

    <EventsAddNewEvent v-model:visible="showAddForm" @submit="handleAddEvent" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const isModalVisible = ref(false);
const modalMode = ref<"view" | "edit">("view");
const selectedEvent = ref<any>(null);
const showAddForm = ref(false);

const columns = [
  { label: "#", key: "id" },
  { label: "Event Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "Date", key: "date" },
  { label: "Time", key: "time" },
  { label: "Venue", key: "venue" },
  { label: "Coordinator", key: "coordinator" },
  { label: "Participants", key: "participantCount" },
  { label: "Visibility", key: "isPublic" },
  { label: "Status", key: "status" },
];

const data = ref([
  {
    id: 1,
    name: "Annual Sports Day",
    category: "Sports",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "School Ground",
    coordinator: "Mr. James Wilson",
    participantCount: 200,
    isPublic: "Public",
    status: "Upcoming",
    description: "Annual inter-house sports competition",
    budget: 5000,
    participants: [
      { type: "Students", classes: ["10A", "10B", "11A", "11B"] },
      { type: "Teachers", departments: ["Sports", "Science"] },
    ],
    schedule: [
      { time: "09:00 AM", activity: "Opening Ceremony" },
      { time: "10:00 AM", activity: "Track Events" },
      { time: "02:00 PM", activity: "Prize Distribution" },
    ],
    requirements: ["Sports Equipment", "Sound System", "First Aid"],
    sponsors: ["Local Sports Store", "Parent Association"],
    ticketPrice: 50,
    guestCapacity: 500,
  },
  {
    id: 2,
    name: "Science Exhibition",
    category: "Academic",
    date: "2024-04-20",
    time: "10:00 AM",
    venue: "School Auditorium",
    coordinator: "Mrs. Sarah Connor",
    participantCount: 150,
    isPublic: "Private",
    status: "Planning",
    description: "Annual science and technology exhibition",
    budget: 3000,
    participants: [
      { type: "Students", classes: ["9A", "9B", "10A", "10B"] },
      { type: "Teachers", departments: ["Science", "Computer Science"] },
    ],
    schedule: [
      { time: "10:00 AM", activity: "Inauguration" },
      { time: "11:00 AM", activity: "Project Display" },
      { time: "03:00 PM", activity: "Awards Ceremony" },
    ],
    requirements: ["Display Boards", "Projector", "Lab Equipment"],
    sponsors: ["Tech Company", "Science Academy"],
    invitedSchools: [],
  },
]);

const viewItem = (item: any) => {
  selectedEvent.value = item;
  modalMode.value = "view";
  isModalVisible.value = true;
};

const editItem = (item: any) => {
  selectedEvent.value = item;
  modalMode.value = "edit";
  isModalVisible.value = true;
};

const deleteItem = (item: any) => {
  const index = data.value.findIndex((event) => event.id === item.id);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};

const showform = () => {
  showAddForm.value = true;
};

const handleAddEvent = (eventData: any) => {
  data.value.push({
    id: data.value.length + 1,
    ...eventData,
    participantCount: 0,
  });
};

const handleEditSubmit = (updatedData: any) => {
  const index = data.value.findIndex(
    (event) => event.id === selectedEvent.value.id
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

    .dropdown-item {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--tgrey-700);

      &:hover {
        background-color: var(--tgrey-100);
      }
    }
  }
}
</style>
