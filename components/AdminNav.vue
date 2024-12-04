<template>
  <div class="default-layout-side-nav">
    <div class="default-layout-side-nav__header">
      <div class="brand">
        <img src="/brand/tegbale-logo.png" alt="tegbale logo" />
        <span>Tegbale</span>
      </div>
    </div>
    <div class="default-layout-side-nav__links">
      <nuxt-link to="/admin/dashboard">
        <Icon name="lucide:airplay" /> <span>Dashboard</span>

      </nuxt-link>
      <nuxt-link to="/admin/schools">
        <Icon name="bxs:school" /> <span>Schools</span>
      </nuxt-link>
      <nuxt-link to="/admin/teachers">
        <Icon name="ph:chalkboard-teacher-light" /> <span>Teachers</span>
      </nuxt-link>
      <nuxt-link to="/admin/students">
        <Icon name="fluent:people-team-24-regular" /> <span>Students</span>
      </nuxt-link>
      <nuxt-link to="/admin/guardians">
        <Icon name="lucide:users" /> <span>Guardians</span>
      </nuxt-link>
      <nuxt-link to="/admin/settings">
        <Icon name="lucide:settings" /> <span>Settings</span>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout-side-nav {
  padding: 0;
  margin: 0;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  &__header {
    height: to-rem(70);
    // border-bottom: to-rem(1) solid #e7e7e4;

    @media screen and (max-width: to-rem(768)) {
      border: none;
      height: to-rem(60);
    }

    display: flex;
    align-items: center;
    padding: 0 to-rem(20);

    .brand {
      display: flex;
      align-items: center;
      gap: to-rem(8);
      margin-top: to-rem(10);

      span {
        color: #408ed5;
        font-size: to-rem(22);
        font-weight: 700;
        font-family: 'roboto', sans-serif;
      }
    }

    div {
      display: flex;
      align-items: center;
      gap: to-rem(8);
      margin-top: to-rem(10);

      img {
        width: to-rem(43);
        height: to-rem(43);
      }

      h1 {
        @include body-font;
        font-size: to-rem(22);
        font-weight: 700;
        line-height: to-rem(20);
        letter-spacing: 0em;
        color: #1c1c1c;
      }
    }
  }

  &__links {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    overflow: auto;
    @include no-select;
    padding: to-rem(10);

    @media screen and (min-width: to-rem(768)) {
      padding: to-rem(30) to-rem(20);
    }

    @media screen and (min-width: to-rem(1300)) {
      padding-top: to-rem(50);
    }

    a {
      display: flex;
      align-items: center;
      gap: to-rem(8);
      color: var(--grey-100);
      text-decoration: none;
      border-radius: to-rem(10);
      padding: to-rem(12) !important;
      transition: all 0.5s ease;
      margin-bottom: to-rem(4);

      span {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        color: #2a2829;
      }

      svg {
        font-size: to-rem(20) !important;
        transition: all 0.4s ease;
      }

      &:hover {
        background-color: #4f4f4f0b;
      }

      &.active,
      &.router-link-exact-active,
      &.router-link-active {
        background-color: #408ed5;

        span {
          color: #fff;
        }

        svg {
          margin-left: to-rem(15);
          color: #fff;
        }
      }
    }
  }
}
</style>
