<template>
    <div class="page-container">
      <section class="title__wrapper">
        <h3>Profile Settings</h3>
      </section>
  
      <div class="profile-content mt-8">
        <!-- Profile Avatar Section -->
        <div class="avatar-section">
          <div v-if="userAvatar" class="avatar-container">
            <img :src="userAvatar" alt="User Avatar" class="avatar-image" />
          </div>
          <div v-else class="avatar-container initials">
            {{ userInitials }}
          </div>
          <label class="upload-button">
            <input type="file" accept="image/*" @change="handleAvatarUpload" class="hidden" />
            Change Photo
          </label>
        </div>
  
        <!-- Profile Information Form -->
        <div class="profile-form mt-8">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="form-group">
                <label>First Name</label>
                <input v-model="profileData.firstName" type="text" class="w-full p-2 border rounded" />
              </div>
  
              <div class="form-group">
                <label>Last Name</label>
                <input v-model="profileData.lastName" type="text" class="w-full p-2 border rounded" />
              </div>
            </div>
  
            <div class="form-group">
              <label>Email</label>
              <input v-model="profileData.email" type="email" class="w-full p-2 border rounded" />
            </div>
  
            <div class="form-group">
              <label>Phone Number</label>
              <input v-model="profileData.phone" type="tel" class="w-full p-2 border rounded" />
            </div>
  
            <div class="flex justify-end">
              <custom-button variant="primary" type="submit">Save Changes</custom-button>
            </div>
          </form>
        </div>
  
        <!-- Change Password Section -->
        <div class="password-section mt-12">
          <h4 class="section-title">Change Password</h4>
          <form @submit.prevent="updatePassword" class="space-y-6 mt-4">
            <div class="form-group">
              <label>Current Password</label>
              <input v-model="passwordData.currentPassword" type="password" class="w-full p-2 border rounded" />
            </div>
  
            <div class="form-group">
              <label>New Password</label>
              <input v-model="passwordData.newPassword" type="password" class="w-full p-2 border rounded" />
            </div>
  
            <div class="form-group">
              <label>Confirm New Password</label>
              <input v-model="passwordData.confirmPassword" type="password" class="w-full p-2 border rounded" />
            </div>
  
            <div class="flex justify-end">
              <custom-button variant="primary" type="submit">Update Password</custom-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: "admin",
  });
  
  const userAvatar = ref<string | null>(null);

  const profileData = ref({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890'
  });
  
  const passwordData = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const userInitials = computed(() => {
    return `${profileData.value.firstName.charAt(0)}${profileData.value.lastName.charAt(0)}`;
  });
  
  const handleAvatarUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userAvatar.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};
  
  const updateProfile = () => {
    // Handle profile update logic
  };
  
  const updatePassword = () => {
    // Handle password update logic
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
  