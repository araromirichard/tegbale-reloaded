<template>
  <div class="page-container">
    <section class="title__wrapper">
      <h3>School Profile Settings</h3>
    </section>

    <div class="profile-content mt-8">
      <!-- School Logo Section -->
      <div class="avatar-section">
        <div v-if="schoolLogo" class="avatar-container">
          <img :src="schoolLogo" alt="School Logo" class="avatar-image" />
        </div>
        <div v-else class="avatar-container initials">
          {{ schoolInitials }}
        </div>
        <label class="upload-button">
          <input
            type="file"
            accept="image/*"
            @change="handleLogoUpload"
            class="hidden"
          />
          Change School Logo
        </label>
      </div>

      <!-- School Information Form -->
      <div class="profile-form mt-8">
        <form @submit.prevent="updateSchoolProfile" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="form-group">
              <label>School Name</label>
              <input
                v-model="schoolData.name"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>

            <div class="form-group">
              <label>School Code</label>
              <input
                v-model="schoolData.code"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="form-group">
              <label>Principal Name</label>
              <input
                v-model="schoolData.principalName"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>

            <div class="form-group">
              <label>Established Year</label>
              <input
                v-model="schoolData.establishedYear"
                type="number"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              v-model="schoolData.email"
              type="email"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input
              v-model="schoolData.phone"
              type="tel"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea
              v-model="schoolData.address"
              class="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="form-group">
              <label>City</label>
              <input
                v-model="schoolData.city"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>

            <div class="form-group">
              <label>State</label>
              <input
                v-model="schoolData.state"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Website</label>
            <input
              v-model="schoolData.website"
              type="url"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>School Type</label>
            <select v-model="schoolData.type" class="w-full p-2 border rounded">
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="international">International</option>
            </select>
          </div>

          <div class="flex justify-end">
            <custom-button variant="primary" type="submit"
              >Save Changes</custom-button
            >
          </div>
        </form>
      </div>

      <!-- Additional Settings Section -->
      <div class="additional-settings mt-12">
        <h4 class="section-title">Additional Settings</h4>
        <div class="mt-4 space-y-4">
          <div class="form-group">
            <label>Academic Year</label>
            <input
              v-model="schoolData.academicYear"
              type="text"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>School Motto</label>
            <input
              v-model="schoolData.motto"
              type="text"
              class="w-full p-2 border rounded"
            />
          </div>

          <div class="form-group">
            <label>Social Media Links</label>
            <div class="space-y-2">
              <input
                v-model="schoolData.socialMedia.facebook"
                placeholder="Facebook"
                type="url"
                class="w-full p-2 border rounded"
              />
              <input
                v-model="schoolData.socialMedia.twitter"
                placeholder="Twitter"
                type="url"
                class="w-full p-2 border rounded"
              />
              <input
                v-model="schoolData.socialMedia.instagram"
                placeholder="Instagram"
                type="url"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const schoolLogo = ref<string | null>(null);

const schoolData = ref({
  name: "Springfield Elementary",
  code: "SPE001",
  principalName: "Dr. Jane Smith",
  establishedYear: 1990,
  email: "info@springfield.edu",
  phone: "+1234567890",
  address: "123 Education Street",
  city: "Springfield",
  state: "ST",
  website: "www.springfield.edu",
  type: "public",
  academicYear: "2023-2024",
  motto: "Learning for Life",
  socialMedia: {
    facebook: "",
    twitter: "",
    instagram: "",
  },
});

const schoolInitials = computed(() => {
  return schoolData.value.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
});

const handleLogoUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      schoolLogo.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const updateSchoolProfile = () => {
  // Handle profile update logic
};
</script>

<style lang="scss">
.page-container {
  @include page-padding;

  .title__wrapper {
    h3 {
      font-size: to-rem(30);
      font-weight: 500;
    }
  }

  .profile-content {
    max-width: 48rem;
    margin: 0 auto;
  }

  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .avatar-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;

      &.initials {
        font-size: 2.5rem;
        font-weight: 500;
        color: #4b5563;
      }
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .upload-button {
      padding: 0.5rem 1rem;
      background-color: #f3f4f6;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;

      &:hover {
        background-color: #e5e7eb;
      }
    }
  }

  .section-title {
    font-size: to-rem(20);
    font-weight: 500;
    color: #111827;
  }

  .form-group {
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
    }
  }
}
</style>
