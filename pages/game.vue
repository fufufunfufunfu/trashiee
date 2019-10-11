<template>
  <div class="game">
    <div class="game__modal">
      <div class="game__slider">
        <button @click="prevSlider">
          <img src="~/assets/image/slider_left.svg" alt="" />
        </button>
        <div class="game__slider-img">
          <img :src="require(`~/assets/image/house_${sliderNum}.svg`)" alt="" />
        </div>
        <button @click="nextSlider">
          <img src="~/assets/image/slider_right.svg" alt="" />
        </button>
        <Button class="game__slider-btn">SKIP</Button>
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
          <img src="~/assets/image/fairy_red.svg" alt="" />
        </span>
        <span class="game__fairy blue">
          <img src="~/assets/image/fairy_blue.svg" alt="" />
        </span>
        <div class="game__table">
          <span class="drop-zone red" data-trash-type="combustible"></span>
          <span class="drop-zone blue" data-trash-type="incombustible"></span>
          <img src="~/assets/image/table.svg" alt="" />
        </div>
      </div>
      <div class="game__table-wrap">
        <span class="game__fairy green">
          <img src="~/assets/image/fairy_green.svg" alt="" />
        </span>
        <span class="game__fairy yellow">
          <img src="~/assets/image/fairy_yellow.svg" alt="" />
        </span>
        <div class="game__table">
          <span class="drop-zone green" data-trash-type="resources"></span>
          <span class="drop-zone yellow" data-trash-type="oversized"></span>
          <img src="~/assets/image/table.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="game__table-lower">
      <div>
        <img src="~/assets/image/table.svg" alt="" />
      </div>
    </div>
    <div
      v-if="trash"
      class="game__waiter-wrap"
      id="waiter-anim"
      :style="{ transform: `translateX(-${waiterOffset}px)` }"
    >
      <div class="game__waiter">
        <img src="~/assets/image/sample.png" alt="" />
      </div>
      <div id="trash-dish">
        <span
          class="game__trash"
          @touchstart.prevent
          @touchmove.prevent="touchMove"
          @touchend.prevent="touchEnd"
          :data-trash-type="trash.type"
        >
          <img :src="trash.img" alt="" draggable="false" />
        </span>
      </div>
    </div>
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
      sliderNum: 1,
      currentSlider: {
        num: 1,
        img: require(`~/assets/image/house_1.svg`)
      },
      solvedCount: 0,
      currentCount: 0,
      numProblem: 10,
      results: [
        {
          answer: '',
          correct: '',
          solved: false
        }
      ],
      waiterOffset: 250,
      trash: null,
      trashes: [
        {
          id: 1,
          name: '',
          type: 'combustible',
          img: require('~/assets/image/sample.png')
        }
      ]
    }
  },
  computed: {
    prevSliderBtn() {
      return this.sliderNum > 1
    },
    nextSliderBtn() {
      return this.sliderNum < 4
    }
  },
  mounted() {
    this.waiterMove()
  },
  methods: {
    prevSlider() {
      this.sliderNum > 1 ? this.sliderNum-- : (this.sliderNum = 1)
    },
    nextSlider() {
      this.sliderNum < 4 ? this.sliderNum++ : (this.sliderNum = 4)
    },
    touchMove(e) {
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
        this.results.push({
          answer: eleType,
          correct: zoneType,
          solved: true
        })
      } else {
        this.results.push({
          answer: eleType,
          correct: zoneType,
          solved: false
        })
      }
      this.currentCount++
    },
    waiterMove() {
      const innerWidth = window.innerWidth
      this.selectTrash()
      this.$nextTick(() => {
        const anime = this.$anime({
          targets: '#waiter-anim',
          translateX: [-this.waiterOffset, innerWidth + this.waiterOffset],
          easing: 'linear',
          duration: 20000
        })
        anime.finished.then(this.clearTrash)
      })

      // window.setTimeout(() => {
      //   this.$anime({
      //     targets: '#waiter-anim',
      //     translateX: innerWidth + 100,
      //     easing: 'linear',
      //     duration: 3000
      //   })
      // }, 1)
    },
    selectTrash() {
      window.console.log(innerWidth)
      this.trash = this.trashes[Math.floor(Math.random() * this.trashes.length)]
    },
    clearTrash() {
      this.trash = null
      window.console.log('cleared')
      this.waiterMove()
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#8f6f5d, #8c683d);
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
  &__slider-btn {
    position: absolute;
    right: 0;
    bottom: 0;
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
    text-align: center;
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
  }
}
.drop-zone {
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 150px;
  opacity: 0.2;
  &.red {
    top: 0;
    left: 0;
    background: red;
  }
  &.blue {
    top: 0;
    right: 0;
    background: blue;
  }
  &.green {
    top: 0;
    left: 0;
    background: green;
  }
  &.yellow {
    top: 0;
    right: 0;
    background: yellow;
  }
}
</style>
