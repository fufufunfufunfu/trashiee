<template>
  <div class="game">
    <transition name="splash">
      <div v-if="showSplash" class="game__splash">
        <p class="game__splash-msg">{{ splashMsg }}</p>
      </div>
    </transition>
    <div v-if="showModal" class="game__modal">
      <div class="game__slider">
        <button class="game__slider-prev" @click="prevSlider">
          <img src="~/assets/image/slider_left.svg" alt="" />
        </button>
        <div class="game__slider-img">
          <img :src="slides[sliderNum - 1].img" alt="" />
        </div>
        <button class="game__slider-next" @click="nextSlider">
          <img src="~/assets/image/slider_right.svg" alt="" />
        </button>
        <Button class="game__slider-btn" @click="startGame">{{
          isLastSlider ? 'START' : 'SKIP'
        }}</Button>
      </div>
    </div>
    <span class="game__count">
      <span class="current">{{ currentCount }}</span
      >/{{ numProblem }}
    </span>
    <div class="game__window">
      <img src="~/assets/image/window_left.svg" alt="" />
      <img src="~/assets/image/window_right.svg" alt="" />
    </div>
    <div class="game__table-upper">
      <div class="game__table-wrap">
        <span class="game__fairy red">
          <img :src="fairyImgs.combustible" alt="" />
        </span>
        <span class="game__fairy blue">
          <img :src="fairyImgs.incombustible" alt="" />
        </span>
        <div class="game__table">
          <span class="drop-zone red" data-trash-type="combustible"></span>
          <span class="drop-zone blue" data-trash-type="incombustible"></span>
          <img src="~/assets/image/table.svg" alt="" />
        </div>
      </div>
      <div class="game__table-wrap">
        <span class="game__fairy green">
          <img :src="fairyImgs.resources" alt="" />
        </span>
        <span class="game__fairy yellow">
          <img :src="fairyImgs.oversized" alt="" />
        </span>
        <div class="game__table">
          <span class="drop-zone green" data-trash-type="resources"></span>
          <span class="drop-zone yellow" data-trash-type="oversized"></span>
          <img src="~/assets/image/table.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="game__table-lower">
      <div class="game__table-wrap">
        <span class="game__fairy purple">
          <img :src="fairyImgs.hazardous" alt="" />
        </span>
        <div class="game__table">
          <span class="drop-zone purple" data-trash-type="hazardous"></span>
          <img src="~/assets/image/table.svg" alt="" />
        </div>
      </div>
    </div>
    <div
      v-if="trash"
      class="game__waiter-wrap"
      id="waiter-anim"
      :style="{ transform: `translateX(-${waiterOffset}px)` }"
    >
      <div class="game__waiter">
        <img src="~/assets/image/waiter.png" alt="" />
      </div>
      <div id="trash-dish">
        <span
          class="game__trash"
          id="trash"
          @touchstart.prevent
          @touchmove.prevent="touchMove"
          @touchend.prevent="touchEnd"
          :data-trash-type="trash.type"
        >
          <img :src="trash.img" alt="" draggable="false" />
        </span>
      </div>
    </div>
    <p>{{ combustible }}</p>
    <button @click="subtractFairy({ key: 'combustible', num: 10 })">
      可燃をひく
    </button>
    <button @click="clearLocalStorage">クリア</button>
  </div>
</template>

<script>
import Button from '~/components/Button'

export default {
  components: {
    Button
  },
  data() {
    return {
      area: null,
      sliderNum: 1,
      showSplash: false,
      splashMsg: '',
      anime: null,
      pending: false,
      showModal: false,
      currentSlider: {
        num: 1,
        img: require(`~/assets/image/house_1.svg`)
      },
      solvedCount: 0,
      currentCount: 1,
      numProblem: 10,
      results: [],
      waiterOffset: 250,
      trash: null,
      trashes: [
        {
          id: 1,
          name: '',
          type: 'combustible',
          img: require('~/assets/image/sample.png')
        }
      ],
      slides: [
        { img: require(`~/assets/image/slide_1.png`) },
        { img: require(`~/assets/image/slide_2.png`) }
      ],
      fairyImgs: {
        combustible: require('~/assets/image/kanen.png'),
        incombustible: require('~/assets/image/funen.png'),
        resources: require('~/assets/image/shigen.png'),
        oversized: require('~/assets/image/sodai.png'),
        hazardous: require('~/assets/image/yugai.png')
      },
      fairyGoodImgs: {
        combustible: require('~/assets/image/kanen_good.png'),
        incombustible: require('~/assets/image/funen_good.png'),
        resources: require('~/assets/image/shigen_good.png'),
        oversized: require('~/assets/image/sodai_good.png'),
        hazardous: require('~/assets/image/yugai_good.png')
      },
      fairyBadImgs: {
        combustible: require('~/assets/image/kanen_bad.png'),
        incombustible: require('~/assets/image/funen_bad.png'),
        resources: require('~/assets/image/shigen_bad.png'),
        oversized: require('~/assets/image/sodai_bad.png'),
        hazardous: require('~/assets/image/yugai_bad.png')
      }
    }
  },
  computed: {
    combustible() {
      return this.$store.state[this.area].combustible
    },
    incombustible() {
      return this.$store.state[this.area].incombustible
    },
    resources() {
      return this.$store.state[this.area].resources
    },
    oversized() {
      return this.$store.state[this.area].oversized
    },
    hazardous() {
      return this.$store.state[this.area].hazardous
    },
    prevSliderBtn() {
      return this.sliderNum > 1
    },
    nextSliderBtn() {
      return this.sliderNum < 4
    },
    isLastSlider() {
      return this.sliderNum === this.slides.length
    }
  },
  created() {
    this.$route.query.area
      ? (this.area = this.$route.query.area)
      : (this.area = 'chiyoda')
  },
  mounted() {
    this.loadArea()
    this.tutorial()
    // this.startGame()
  },
  methods: {
    tutorial() {
      this.showModal = true
    },
    subtractFairy({ key, num }) {
      this.$store.commit(`${this.area}/subtractFairy`, {
        key: key,
        num: num
      })
    },
    prevSlider() {
      this.sliderNum > 1 ? this.sliderNum-- : (this.sliderNum = 1)
    },
    nextSlider() {
      this.sliderNum < this.slides.length
        ? this.sliderNum++
        : (this.sliderNum = this.slides.length)
    },
    touchMove(e) {
      if (this.pending) return
      const ele = e.currentTarget
      document.documentElement.appendChild(ele)

      // ele.parentNode.removeChild(ele)
      const touch = e.changedTouches[0]
      ele.style.position = 'fixed'
      ele.style.top =
        touch.pageY - window.pageYOffset - ele.offsetHeight / 2 + 'px'
      ele.style.left =
        touch.pageX - window.pageXOffset - ele.offsetWidth / 2 + 'px'
    },
    touchEnd(e) {
      // ドラッグ中の操作のために変更していたスタイルを元に戻す
      const droppedElem = e.currentTarget
      droppedElem.style.position = 'relative'
      droppedElem.style.top = ''
      droppedElem.style.left = ''

      // ドロップした位置にあるドロップ可能なエレメントに親子付けする
      const touch = event.changedTouches[0]
      // スクロール分を加味した座標に存在するエレメントを新しい親とする
      const newParentElem = document.elementFromPoint(
        touch.pageX - window.pageXOffset,
        touch.pageY - window.pageYOffset
      )
      window.console.log(newParentElem)
      if (newParentElem.classList.contains('drop-zone')) {
        newParentElem.appendChild(droppedElem)
        this.pending = true
        this.judgeTrash(newParentElem, droppedElem)
      } else {
        droppedElem.parentNode.removeChild(droppedElem)
        const dish = document.getElementById('trash-dish')

        dish.appendChild(droppedElem)
      }
    },
    judgeTrash(zone, ele) {
      window.console.log(zone, ele)
      const zoneType = zone.dataset.trashType
      window.console.log(zone.dataset.trashType)
      const eleType = ele.dataset.trashType
      if (eleType === zoneType) {
        this.solvedCount++
        this.subtractFairy({ key: zoneType, num: 1 })
        const currentImg = this.fairyImgs[zoneType]
        this.fairyImgs[zoneType] = this.fairyGoodImgs[zoneType]
        window.setTimeout(() => {
          this.fairyImgs[zoneType] = currentImg
        }, 2000)
        this.results.push({
          img: this.trash.img,
          answer: zoneType,
          correct: eleType,
          solved: true
        })
      } else {
        const currentImg = this.fairyImgs[zoneType]
        this.fairyImgs[zoneType] = this.fairyBadImgs[zoneType]
        window.setTimeout(() => {
          this.fairyImgs[zoneType] = currentImg
        }, 2000)
        this.results.push({
          img: this.trash.img,
          answer: zoneType,
          correct: eleType,
          solved: false
        })
        ele.parentNode.removeChild(ele)
        const dish = document.getElementById('trash-dish')

        dish.appendChild(ele)
      }
      this.anime.pause()
      this.anime = this.$anime({
        targets: '#waiter-anim',
        translateX: innerWidth + this.waiterOffset,
        easing: 'linear',
        duration: 2000
      })
      this.anime.finished.then(this.clearTrash)
    },
    waiterMove() {
      const innerWidth = window.innerWidth
      window.console.log(innerWidth)
      this.selectTrash()
      this.$nextTick(() => {
        this.anime = this.$anime({
          targets: '#waiter-anim',
          translateX: [-this.waiterOffset, innerWidth + this.waiterOffset],
          easing: 'linear',
          duration: 20000
        })
        this.anime.finished.then(this.clearTrash)
      })
    },
    selectTrash() {
      this.trash = this.trashes[Math.floor(Math.random() * this.trashes.length)]
    },
    clearTrash() {
      if (!this.pending) {
        const trash = document.getElementById('trash')
        this.results.push({
          img: this.trash.img,
          answer: null,
          correct: trash.dataset.trashType,
          solved: false
        })
      }
      this.trash = null
      const ele = document.getElementById('trash')
      ele.parentNode.removeChild(ele)
      const dish = document.getElementById('trash-dish')
      dish.appendChild(ele)
      this.pending = false
      if (this.currentCount < 10) {
        this.currentCount++
        this.waiterMove()
      } else {
        this.finishGame()
      }
    },
    loadArea() {
      const trashes = require(`~/data/${this.area}.json`)
      this.trashes = trashes
    },
    clearLocalStorage() {
      localStorage.clear()
    },
    insertResults() {
      this.$store.commit('result/insertResults', { results: this.results })
    },
    finishGame() {
      this.trash = null
      this.insertResults()
      this.splashMsg = 'FINISH!'
      this.showSplash = true
      window.console.log(this.results)
      window.setTimeout(() => {
        this.$router.push({ path: 'result', query: { area: this.area } })
      }, 2000)
    },
    startGame() {
      this.showModal = false
      this.showSplash = true
      this.splashMsg = 3
      new Promise(resolve => {
        window.setTimeout(() => {
          window.console.log('2')
          this.splashMsg = 2
          resolve()
        }, 1000)
      })
        .then(() => {
          return new Promise(resolve => {
            window.setTimeout(() => {
              window.console.log('1')
              this.splashMsg = 1
              resolve()
            }, 1000)
          })
        })
        .then(() => {
          return new Promise(resolve => {
            window.setTimeout(() => {
              window.console.log('start')
              this.splashMsg = 'START!'
              resolve()
            }, 1000)
          })
        })
        .then(() => {
          window.setTimeout(() => {
            this.showSplash = false
            this.waiterMove()
          }, 500)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.splash {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
.game {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#8f6f5d, #8c683d);
  overflow: hidden;
  &__splash {
    position: absolute;
    z-index: 700;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.4);
  }
  &__splash-msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 140px;
    color: #7c7c7c;
  }
  &__modal {
    position: absolute;
    z-index: 500;
    background: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
  }
  &__slider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 80px);
    height: calc(100vh - 80px);
    background: #fff;
    border-radius: 24px;
  }
  &__slider-prev {
    padding: 40px;
  }
  &__slider-next {
    padding: 40px;
  }
  &__slider-img {
    position: relative;
    flex-basis: 0;
    flex-grow: 1;
    height: calc(100% - 80px);
    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }
  &__slider-btn {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
  &__count {
    position: absolute;
    top: 12px;
    left: 64px;
    z-index: 400;
    display: inline-block;
    font-size: 32px;
    font-weight: 700;
    color: $c-text_white;
    .current {
      font-size: 64px;
    }
  }
  &__window {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    top: 0;
  }
  &__table-upper {
    display: flex;
    justify-content: space-around;
    padding-top: 200px;
  }
  &__table-lower {
    display: flex;
    justify-content: center;
  }
  &__table-wrap {
    position: relative;
  }
  &__table {
    position: relative;
  }
  &__fairy {
    position: absolute;
    display: inline-block;
    img {
      width: 100%;
    }
    &.red {
      top: -205px;
      left: 0;
      width: 180px;
    }
    &.blue {
      top: -143px;
      right: 0;
      width: 180px;
    }
    &.green {
      top: -145px;
      left: 0;
      width: 165px;
    }
    &.yellow {
      top: -156px;
      right: -23px;
      width: 253px;
    }
    &.purple {
      top: -160px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
    }
  }
  &__waiter-wrap {
    position: absolute;
    bottom: 0;
    display: flex;
  }
  &__waiter {
    width: 200px;
    img {
      width: 100%;
    }
  }
  &__trash {
    display: inline-block;
    width: 150px;
    height: 150px;
    img {
      width: 100%;
    }
  }
}
.drop-zone {
  position: absolute;
  top: -100px;
  display: inline-flex;
  justify-content: center;
  align-items: flex-end;
  width: 180px;
  height: 250px;
  // opacity: 0.2;
  &.red {
    left: 0;
    // background: red;
  }
  &.blue {
    right: 0;
    // background: blue;
  }
  &.green {
    left: 0;
    // background: green;
  }
  &.yellow {
    right: 0;
    // background: yellow;
  }
  &.purple {
    left: 50%;
    transform: translateX(-50%);
    // background: purple;
  }
}
</style>
