<template>
  <div class="container">
    <div class="bg">
      <ul class="house-wrap">
        <transition-group name="house">
          <li class="house" v-for="house in houses" :key="house.id">
            <img :src="house.src" alt="" />
          </li>
        </transition-group>
      </ul>
      <div class="ground"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
.house-wrap {
  flex-basis: 0;
  flex-grow: 1;
  position: relative;
}
.house {
  position: absolute;
  bottom: -12px;
  right: -400px;

  &-enter-active {
    animation: house linear 16s;
  }
}
@keyframes house {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200vw);
  }
}
</style>

<script>
export default {
  data() {
    return {
      houseImagePaths: [
        require('~/assets/image/house_1.svg'),
        require('~/assets/image/house_2.svg'),
        require('~/assets/image/house_3.svg'),
        require('~/assets/image/house_4.svg')
      ],
      houses: []
    }
  },
  mounted() {
    window.setInterval(this.createHouse, 2000)
    window.setTimeout(this.startDestroy, 12000)
  },
  methods: {
    selectImage() {
      const index = Math.floor(Math.random() * 4)
      return this.houseImagePaths[index]
    },
    getNextId() {
      if (this.houses === []) return 0
      let currentMaxId = 0
      this.houses.forEach(house => {
        if (currentMaxId < house.id) currentMaxId = house.id
      })
      return currentMaxId + 1
    },
    createHouse() {
      window.console.log('created')
      this.houses.push({
        id: this.getNextId(),
        src: this.selectImage()
      })
    },
    destroyHouse() {
      window.console.log('destroyed')
      this.houses.shift()
    },
    startDestroy() {
      window.setInterval(this.destroyHouse, 2000)
    }
  }
}
</script>
