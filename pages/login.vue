<template>
    <div class="login-page">
        <div class="flex flex-col justify-center items-center">
            <img src="/brand/tegbale-logo.png" alt="tegbale logo"
                class="w-16 h-16 object-contain block md:hidden" /><br>
            <h3 class="text-3xl font-bold text-center text-blue-400 block md:hidden">
                Welcome Back
            </h3>
        </div>
        <form @submit="handleSubmit" class="mt-8 space-y-4">
            <custom-input
                v-model="formData.email"
                type="email"
                label="Email"
                placeholder="Your email"
                :error="errorMessages.email"
            />

            <div class="password-section">
                <custom-input
                    v-model="formData.password"
                    type="password"
                    label="Password"
                    placeholder="********"
                    :error="errorMessages.password"
                />
                <div class="flex justify-end">
                    <nuxt-link to="#" class="text-sm text-primary-500 hover:text-primary-300">
                        Forgot Password?
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-4">
                <custom-button variant="primary" type="submit" block>
                    Sign in
                </custom-button>
            </div>
        </form>
    </div>
</template>



<script lang="ts" setup>
definePageMeta({
    layout: "auth",
});

// Define interface for form data
interface FormData {
    email: string;
    password: string;
}

// Define reactive variables for form data and error messages
const formData = ref<FormData>({
    email: "",
    password: "",
});

const errorMessages = ref<Partial<Record<keyof FormData, string>>>({
    email: "",
    password: "",
});

const generalError = ref<boolean>(false);

// computed properties for error checks
const emailHasError = computed(() => !!errorMessages.value.email);
const passwordHasError = computed(() => !!errorMessages.value.password);

// Function to validate the form
const validateForm = () => {
    return true; // TODO: Implement form validation
};

// Function to handle form submission
const handleSubmit = () => {
    if (validateForm()) {
        // Handle form submission (e.g., API request, redirection)
    }
};
</script>

<style scoped lang="scss">
.login-page {
    margin: 0 auto;
    background-color: #fff;
    max-width: 480px;
    width: 100%;
    height: auto;
    min-height: 400px;
    padding: 24px 24px 48px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: transparent;
    border-radius: 8px;


    .signin-button {
        width: 100%;
        height: 46px;
        border-radius: 6px;
        background-color: #007bff;
        color: #fff;
        border: transparent;
        border-radius: 25px;
        
        &:hover {
            background-color: #0069d9;
        }
    }


    .link {
        text-align: center;
        font-size: 14px;

        a {
            color: #007bff;
            text-decoration: underline;
        }
    }

}
</style>