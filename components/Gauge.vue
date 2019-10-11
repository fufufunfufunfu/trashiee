<template>
  <ul class="gauge">
    <li v-for="key in keys" :key="key" class="gauge__item">
      <span class="gauge__num"
        ><span class="remain">残り</span>{{ countObj[key] }}</span
      >
      <span class="gauge__bar-wrap">
        <span
          :class="['gauge__bar', key]"
          :style="[
            isAnimating ? { transition: 'width ease 1s' } : '',
            { width: o[key] + '%' }
          ]"
        ></span>
      </span>
    </li>
  </ul>
</template>

<script>
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
      },
      immediate: true
    }
  },
  data() {
    return {
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
      countObj: null
    }
  },
  mounted() {},
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
  padding: 80px;
  background: #f8f8f8;
  border-radius: 160px;
  &__item {
    display: flex;
    align-items: baseline;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
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
