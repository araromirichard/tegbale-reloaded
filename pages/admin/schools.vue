<template>
    <div class="page-container">
        <section class="title__wrapper">
            <h3>Schools</h3>
            <Button class="add-button">

                <Icon name="lucide:circle-plus" />

                Add School
            </Button>
        </section>

        <section class="mt-8">
            <CoreWrapperDatatable :columns="columns" :data="data" :viewItem="viewItem" :editItem="editItem"
                :deleteItem="deleteItem" />


        </section>
    </div>

    <div>
        <RightSidedModal :visible="isModalVisible" @update:visible="isModalVisible = $event" header="Edit Profile">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Username</label>
                <InputText id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="email" class="font-semibold w-24">Email</label>
                <InputText id="email" class="flex-auto" autocomplete="off" />
            </div>
        </RightSidedModal>
    

    </div>
    <MyDialog />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin",
});

const columns = [
    { label: '#', key: 'id' },
    { label: 'School Name', key: 'name' },
    { label: 'Location', key: 'location' },
    { label: 'Number of Students', key: 'students' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Established', key: 'established' },
];

const data = ref([
    {
        id: 1,
        name: 'Springfield Elementary',
        location: 'Springfield',
        students: 500,
        email: 'springfield@example.com',
        phone: '555-555-5555',
        established: '1990',
    },
    {
        id: 2,
        name: 'Shelbyville High',
        location: 'Shelbyville',
        students: 800,
        email: 'shelbyville@example.com',
        phone: '555-555-5555',
        established: '1985',
    },
]);
const isModalVisible = ref(false);

// const openModal = () => {
//     isModalVisible.value = true;
// };
const closeModal = () => {
    isModalVisible.value = false;
};
const viewItem = (item: any) => {
    console.log('Viewing item', item);
    isModalVisible.value = true;
};

const editItem = (item: any) => {
    console.log('Editing item', item);
};

const deleteItem = (item: any) => {
    console.log('Deleting item', item);
};
</script>

<style scoped lang="scss">
.page-container {
    @include page-padding;

    .title__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            font-size: rem(20);
            font-weight: 500;
            font-family: "Roboto", sans-serif;
            margin-top: .25rem;
        }

        .add-button {
            font-size: rem(14);
            padding: .5rem .75rem;
            border-radius: 6px;
            background-color: #007bff;
            color: #fff;
            border: transparent;

            &:hover {
                background-color: #0069d9;
            }
        }
    }

    .table__container {
        width: 100%;
        overflow-x: auto;
        padding: 1rem;
        background-color: #f9f8f8;

        table {
            min-width: 100%;
            background-color: #fff;

            th {
                font-size: rem(12);
            }

            td {
                font-size: rem(12);

                span {
                    font-size: rem(12);
                }
            }
        }
    }

    .dialog-right {
        transform: translateX(100%);
    }
}

// Responsive styles
@media (min-width: 768px) {

    // Tablets
    .page-container {
        .title__wrapper h3 {
            font-size: rem(22);
        }

        .add-button {
            font-size: rem(16);
            padding: .75rem 1rem;
        }

        .table__container {
            padding: 1.5rem;

            table th,
            table td,
            table td span {
                font-size: rem(14);
            }
        }
    }
}

@media (min-width: 1024px) {

    // Laptops
    .page-container {
        .title__wrapper h3 {
            font-size: rem(24);
        }

        .add-button {
            font-size: rem(18);
            padding: 1rem 1.25rem;
        }

        .table__container {
            padding: 2rem;

            table th,
            table td,
            table td span {
                font-size: rem(16);
            }
        }
    }
}

@media (min-width: 1280px) {

    // Desktops
    .page-container {
        .title__wrapper h3 {
            font-size: rem(26);
        }

        .add-button {
            font-size: rem(20);
            padding: 1.25rem 1.5rem;
        }

        .table__container {
            padding: 2.5rem;

            table th,
            table td,
            table td span {
                font-size: rem(18);
            }
        }
    }
}
</style>
