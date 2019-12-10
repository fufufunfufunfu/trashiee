<template>
  <div class="container">
    <div class="tap-area" @click="$router.push('map')">
      <div class="logo">
        <img src="~/assets/image/title.png" alt="" />
      </div>
      <p>TAP TO START</p>
    </div>
    <div class="bg">
      <div class="house">
        <img src="~/assets/image/top_background.svg" alt="" />
      </div>
      <div class="ground"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tap-area {
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  p {
    position: absolute;
    bottom: 100px;
    width: 100%;
    font-size: 64px;
    font-weight: 700;
    color: #8a6c6c;
    text-align: center;
  }
}
.bg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#b8f2ff, rgba(255, 255, 255, 0));
  position: relative;
  display: flex;
  flex-direction: column;
}
.ground {
  background: #ebdebe;
  // position: absolute;
  // bottom: 0;
  width: 100%;
  height: 200px;
  z-index: 100;
}
.house {
  flex-basis: 0;
  flex-grow: 1;
  position: relative;
  img {
    position: absolute;
    bottom: -4px;
    width: 600vw;
  }
  animation: house 30s linear infinite;
}
@keyframes house {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-500vw);
  }
}
</style>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
