<template>
  <ul class="gauge" v-if="show">
    <li v-for="key in keys" :key="key" class="gauge__item">
      <span class="gauge__img">
        <img :src="fairyImgs[key]" alt="" />
      </span>
      <span class="gauge__num"
        ><span class="remain">残り</span>{{ countObj[key] }}</span
      >
      <span class="gauge__bar-wrap">
        <span
          :class="['gauge__bar', key]"
          :style="[
            isAnimating ? { transition: 'width ease 1s' } : '',
            { width: (o[key] / numInitFairy) * 100 + '%' }
          ]"
        ></span>
      </span>
    </li>
  </ul>
</template>

<script>
import { NUM_INITIAL_FAIRY } from '~/lib/constant'

export default {
  props: {
    current: {
      type: Object,
      required: true
    },
    old: {
      type: Object,
      required: true
    },
    anime: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show: {
      handler(val) {
        if (!this.show) return
        if (this.anime && val) {
          this.c = this.current
          this.o = this.old
          this.countObj = this.$lodash.cloneDeep(this.old)
          this.animation()
        } else {
          this.isAnimating = false
          this.o = this.current
          this.countObj = this.current
        }
      }
    }
  },
  data() {
    return {
      numInitFairy: NUM_INITIAL_FAIRY,
      isAnimating: false,
      keys: [
        'combustible',
        'incombustible',
        'resources',
        'oversized',
        'hazardous'
      ],
      c: null,
      o: null,
      countObj: null,
      fairyImgs: {
        combustible: require('~/assets/image/kanen.png'),
        incombustible: require('~/assets/image/funen.png'),
        resources: require('~/assets/image/shigen.png'),
        oversized: require('~/assets/image/sodai.png'),
        hazardous: require('~/assets/image/yugai.png')
      }
    }
  },
  mounted() {
    // window.console.log(this.current)
  },
  methods: {
    animation() {
      this.isAnimating = true
      this.$anime({
        targets: this.countObj,
        combustible: this.c.combustible,
        round: 1,
        duration: 1000,
        easing: 'linear'
      })
      this.$anime({
        targets: this.countObj,
        incombustible: this.c.incombustible,
        round: 1,
        duration: 1000,
        easing: 'linear'
      })
      this.$anime({
        targets: this.countObj,
        resources: this.c.resources,
        round: 1,
        duration: 1000,
        easing: 'linear'
      })
      window.setTimeout(() => {
        this.o = this.c
      }, 100)
      window.setTimeout(() => {
        this.isAnimating = false
      }, 1100)
    }
  }
}
</script>

<style lang="scss" scoped>
.gauge {
  padding: 24px;
  background: #f8f8f8;
  border-radius: 16px;
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__img {
    display: inline-block;
    width: 60px;
    margin-right: 16px;
    img {
      width: 100%;
    }
  }
  &__bar-wrap {
    display: inline-block;
    flex-basis: 0;
    flex-grow: 1;
    background: #2b2b2b;
    list-style-type: none;
    height: 40px;
  }
  &__bar {
    display: inline-block;
    height: 100%;
    &.combustible {
      background: $c-red;
    }
    &.incombustible {
      background: $c-blue;
    }
    &.resources {
      background: $c-green;
    }
    &.oversized {
      background: #ffe249;
    }
    &.hazardous {
      background: #b88cff;
    }
  }
  &__num {
    width: 120px;
    margin-right: 16px;
    font-size: 40px;
    font-weight: 700;
    color: $c-red;
    .remain {
      font-size: 24px;
    }
  }
}
</style>
