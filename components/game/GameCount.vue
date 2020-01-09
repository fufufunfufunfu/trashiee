<template>
  <span class="game-count">
    <span class="game-count__current">{{ currentCount }}</span>
    <span class="game-count__total">/{{ numOfQuestions }}</span>
  </span>
</template>

<script>
export default {
  name: 'GameCount',
  props: {
    currentCount: {
      type: Number
    },
    numOfQuestions: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.game-count {
  position: absolute;
  top: 12px;
  left: 64px;
  z-index: 400;
  display: inline-block;
  font-size: 32px;
  font-weight: 700;
  color: $c-text_white;
  &__current {
    font-size: 48px;
  }
}
</style>
