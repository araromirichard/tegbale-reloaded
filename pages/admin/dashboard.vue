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
        font-size: to-rem(30);
        font-weight: 500;
    }

    .summary__wrapper {
        margin-top: to-rem(40);
        width: 100%;
        height: auto;

        @media screen and (min-width: to-rem(768)) {
            margin-top: to-rem(40);
        }

        .summary__item {
            @include grid-layout(4, to-rem(24))
        }
    }

}
</style>