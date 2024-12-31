<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  mode: "view" | "edit";
  classroomData: any;
}>();

const visible = defineModel("visible", { type: Boolean, default: false });
const emit = defineEmits(["update:visible", "submit"]);

const formData = ref({ ...props.classroomData });

const closeDialog = () => {
  emit("update:visible", false);
};

const handleSubmit = () => {
  emit("submit", formData.value);
  closeDialog();
};

watch(
  () => props.classroomData,
  (newData) => {
    formData.value = { ...newData };
  },
  { deep: true }
);
</script>

<template>
  <RightSidedModal
    :visible="visible"
    :header="
      mode === 'view' ? 'View Classroom Details' : 'Edit Classroom Details'
    "
    width="40rem"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <h3 class="modalTitle">
        {{
          mode === "view" ? "View Classroom Details" : "Edit Classroom Details"
        }}
      </h3>
    </template>

    <div class="p-4">
      <div class="classroom-stats mb-6">
        <div class="stat-card">
          <span class="stat-label">Total Students</span>
          <span class="stat-value">{{ formData.totalStudents }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Class Average</span>
          <span class="stat-value">{{ formData.classAverage }}%</span>
        </div>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="form-group">
            <label>Class Name</label>
            <input
              v-model="formData.name"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Class Teacher</label>
            <input
              v-model="formData.teacher"
              type="text"
              :readonly="mode === 'view'"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="info-display">
            <h4>Class Schedule</h4>
            <div class="schedule-grid">
                <!-- <pre>{{ formData.schedule }}</pre> -->
              <div
                v-for="(schedule, i) in formData.schedule"
                :key="i"
                class="schedule-item"
              >
                <span class="day">{{ schedule.day }}</span>
                <span v-for="(subject, j) in schedule.subjects"
                :key="j">
                <span class="time">{{ subject }}</span>
            </span>
              </div>
            </div>
          </div>

          <div class="info-display">
            <h4>Recent Activities</h4>
            <div class="activities-list">
                
              <div
                v-for="activity in formData.recentActivities"
                :key="activity.id"
                class="activity-item"
              >
                <span class="activity-date">{{ activity.date }}</span>
                <span class="activity-desc">{{ activity.description }}</span>
              </div>
            </div>
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

.classroom-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;

  .stat-label {
    display: block;
    font-size: 0.875rem;
    color: #6c757d;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
  }
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

.info-display {
  margin-top: 1.5rem;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
}

.schedule-item {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.375rem;

  .day {
    display: block;
    font-weight: 500;
    color: #495057;
  }

  .time {
    display: block;
    font-size: 0.875rem;
    color: #6c757d;
  }
}

.activities-list {
  .activity-item {
    padding: 0.75rem;
    border-bottom: 1px solid #dee2e6;

    &:last-child {
      border-bottom: none;
    }

    .activity-date {
      font-size: 0.875rem;
      color: #6c757d;
      margin-right: 0.5rem;
    }

    .activity-desc {
      color: #212529;
    }
  }
}
</style>
