<template>
  <div class="game-bg">
    <div class="game-bg__window window-list">
      <img
        src="~/assets/image/window_left.svg"
        alt=""
        class="window-list__item"
      />
      <img
        src="~/assets/image/window_right.svg"
        alt=""
        class="window-list__item"
      />
    </div>
  </div>
</template>

<style lang="scss">
.game-bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#8f6f5d, #8c683d);
  overflow: hidden;
  &__window {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    top: 0;
  }
  .window-list {
    &__item {
      display: block;
      width: 40px;
    }
  }
}
</style>
