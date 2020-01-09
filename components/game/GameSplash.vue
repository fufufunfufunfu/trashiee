<template>
  <div class="game-splash">
    <transition name="fade-splash">
      <div v-if="message" class="game-splash__inner">
        <p class="game-splash__msg">{{ message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GameSplash',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-splash {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.game-splash {
  &__inner {
    position: absolute;
    z-index: 700;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.4);
  }
  &__msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 140px;
    color: #7c7c7c;
  }
}
</style>
