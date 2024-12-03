<template>
    <div class="item-wrapper">
        <div class="icon">
            <slot />
        </div>
        <div class="text-content">
            <p class="item-title">{{ title }}</p>
            <p class="item-value">{{ itemvalue }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    },
    itemvalue: {
        type: String,
        required: true
    }
})

</script>

<style scoped lang="scss">
.item-wrapper {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: #fff;
    position: relative;
    width: 100%;
    @include shadowed;

    .icon {
        position: absolute;
        top: -18px;
        /* Adjust as needed */
    }

    .text-content {
        margin-left: auto;
        padding: 0.5rem;
        /* Aligns text-content to the right */

        p {
            /* Common styles for all <p> elements inside .text-content */
            margin: 0;
            /* Remove default margin */

            &:first-child {
                /* Styles for the first <p> element */
                font-weight: normal;
                font-size: 15px;
                color: rgba(169, 169, 169, 1);
                /* Example color */
            }

            &:last-child {
                float: right;
                color: #000000;
                font-weight: 500;
                font-size: 30px;
            }
        }
    }
}
</style>
