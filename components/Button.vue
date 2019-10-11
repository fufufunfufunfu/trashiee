<template>
  <a
    v-if="link"
    :href="link"
    class="btn"
    :class="`btn--${type}`"
    target="_blank"
    rel="noopener"
    @click="$emit('click')"
  >
    <slot></slot>
  </a>
  <button
    v-else
    class="btn"
    :class="`btn--${type}`"
    @click="$emit('click')"
    ontouchstart=""
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: function(value) {
        return ['primary', 'secondary', 'default'].indexOf(value) !== -1
      }
    },
    link: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick() {
      if (this.link !== '' && this.link !== undefined) {
        location.href = this.link
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin btnBgColor($color) {
  background-color: $color;
  &:hover,
  &:focus {
    background-color: darken($color, 8%);
    cursor: pointer;
  }

  &:active {
    background-color: darken($color, 16%);
    cursor: pointer;
  }
}

.btn {
  border: none;
  cursor: pointer;
  display: inline-block;
  color: $c-text_white;
  font-size: 48px;
  font-weight: 700;
  height: 56px;
  line-height: 56px;
  padding: 0 40px;
  outline: none;
  position: relative;
  text-decoration: none;
  border-radius: 28px;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: -4px;
    background: darken($c-orange, 20);
    z-index: -1;
    border-radius: 28px;
  }
  &:active {
    transform: translateY(4px);
    &::before {
      transform: translateY(-4px);
    }
  }

  &--primary {
    @include btnBgColor($c-orange);
  }
}
</style>
