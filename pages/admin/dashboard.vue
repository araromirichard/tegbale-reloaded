<template>
    <div class="page-container">
        <h3>Dashboard</h3>
        <div class="summary__wrapper">
            <div class="summary__item ">
                <CoreWrapperSummaryCardItem title="Schools" itemvalue="10">
                    <IconsBuilding />
                </CoreWrapperSummaryCardItem>
                <CoreWrapperSummaryCardItem title="Students" itemvalue="200">
                    <IconsAcadacap />
                </CoreWrapperSummaryCardItem>
                <CoreWrapperSummaryCardItem title="Teachers" itemvalue="24">
                    <IconsTeachericon />
                </CoreWrapperSummaryCardItem>
                <CoreWrapperSummaryCardItem title="Parents" itemvalue="72">
                    <IconsParenticon />
                </CoreWrapperSummaryCardItem>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin",
});


</script>

<style scoped lang="scss">
.page-container {
    @include page-padding;

    h3 {
        font-size: 30px;
        font-weight: 500;
        font-family: "Roboto", sans-serif;
        margin-top: .25rem;
    }

    .summary__wrapper {
        margin-top: rem(40);
        width: 100%;
        height: auto;

        @media screen and (min-width: rem(768)) {
            margin-top: rem(24);
        }

        .summary__item {
            @include grid-layout(4, rem(24))
        }
    }

}
</style>