<template>
  <div class="container">
    <div class="bg">
      <ul class="window">
        <li class="window__item">
          <img src="~/assets/image/window_right.svg" alt="" />
        </li>
        <li class="window__item">
          <img src="~/assets/image/window_right.svg" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#8f6f5d, #8c683d);
}
.window {
  display: flex;
  justify-content: space-between;
  &__item {
    list-style-type: none;
  }
}
</style>
