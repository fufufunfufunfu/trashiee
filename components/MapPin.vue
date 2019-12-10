<template>
  <div class="pin">
    <span class="pin__remain">残り{{ remain }}%</span>
    <h4 class="pin__city">{{ city }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    remain: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.pin {
  text-align: center;
  &__remain {
    font-size: 24px;
    font-weight: 700;
    color: #227f94;
  }
  &__city {
    position: relative;

    height: 56px;
    padding: 0 16px;

    font-size: 28px;
    line-height: 56px;
    color: #659a94;

    background: #fff;
    border-radius: 32px;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -12px;

      width: 0;
      height: 0;

      border-style: solid;
      $bw: 12px;
      border-width: $bw $bw 0 $bw;
      border-color: #fff transparent transparent transparent;
    }
  }
}
</style>
