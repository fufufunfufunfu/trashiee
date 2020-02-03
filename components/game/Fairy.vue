<template>
  <span class="fairy">
    <span class="fairy__text" :class="`fairy__text--${type}`"
      >好物：{{ type | typeToText }}</span
    >
    <img :src="fairyImages[type][state]" alt="" class="fairy__image" />
  </span>
</template>

<style lang="scss" scoped>
@mixin fairyTextBalloon($bg-color, $text-color) {
  color: $text-color;
  background-color: $bg-color;
  &::after {
    border-top-color: $bg-color;
  }
}

.fairy {
  position: relative;
  &__text {
    position: absolute;
    top: -48px;
    display: inline-block;
    padding: 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -8px;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px 8px 0 8px;
      border-color: transparent;
    }
    &--combustible {
      @include fairyTextBalloon(#ffc2c2, #df0028);
    }
    &--incombustible {
      @include fairyTextBalloon(#c2deff, #0069e4);
    }
    &--recyclable {
      @include fairyTextBalloon(#71ffee, #0099a3);
    }
    &--oversized {
      @include fairyTextBalloon(#ffdda9, #ff6b00);
    }
    &--hazardous {
      @include fairyTextBalloon(#e5c5ff, #a850de);
    }
  }
  &__image {
    width: 100%;
    height: auto;
  }
}
</style>

<script>
export default {
  name: 'Fairy',
  filters: {
    typeToText(type) {
      switch (type) {
        case 'combustible':
          return '可燃ゴミ'
        case 'incombustible':
          return '不燃ゴミ'
        case 'recyclable':
          return '資源ゴミ'
        case 'oversized':
          return '粗大ゴミ'
        case 'hazardous':
          return '有害ゴミ'
      }
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      validator() {
        return [
          'combustible',
          'incombustible',
          'recyclable',
          'oversized',
          'hazardous'
        ]
      }
    },
    state: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'good', 'bad'].includes(value)
      }
    }
  },
  data() {
    return {
      fairyImages: {
        combustible: {
          normal: require('~/assets/image/combustible_neutral.png'),
          good: require('~/assets/image/combustible_good.png'),
          bad: require('~/assets/image/combustible_bad.png')
        },
        incombustible: {
          normal: require('~/assets/image/incombustible_neutral.png'),
          good: require('~/assets/image/incombustible_good.png'),
          bad: require('~/assets/image/incombustible_bad.png')
        },
        recyclable: {
          normal: require('~/assets/image/recyclable_neutral.png'),
          good: require('~/assets/image/recyclable_good.png'),
          bad: require('~/assets/image/recyclable_bad.png')
        },
        oversized: {
          normal: require('~/assets/image/oversized_neutral.png'),
          good: require('~/assets/image/oversized_good.png'),
          bad: require('~/assets/image/oversized_bad.png')
        },
        hazardous: {
          normal: require('~/assets/image/hazardous_neutral.png'),
          good: require('~/assets/image/hazardous_good.png'),
          bad: require('~/assets/image/hazardous_bad.png')
        }
      }
    }
  }
}
</script>
