<template>
  <div class="game">
    <GameBackground />
    <GameSplash :message="splashMsg" class="splash" />
    <GameCount :current-count="currentCount" :num-of-questions="numProblem" />
    <ul class="table-list">
      <li
        v-for="fairies in fairiesArray"
        :key="fairies[0]"
        class="table-list__item table-item"
      >
        <Table>
          <ul class="table__fairy-list fairy-list">
            <li v-for="fairy in fairies" :key="fairy" class="fairy-list__item">
              <DropZone :list-key="fairy" @answered="answered" />
            </li>
          </ul>
        </Table>
      </li>
    </ul>
    <TheWaiter
      id="waiter"
      :trash="trashes[0]"
      :style="styleWaiter"
      class="waiter"
    />
  </div>
</template>

<script>
import Button from '~/components/Button'
import GameBackground from '~/components/game/GameBackground.vue'
import GameCount from '~/components/game/GameCount.vue'
import GameSplash from '~/components/game/GameSplash.vue'
import TheWaiter from '~/components/game/TheWaiter.vue'
import DropZone from '~/components/trash/DropZone.vue'
import Fairy from '~/components/game/Fairy.vue'
import Table from '~/components/game/Table.vue'

function returnValueAfterWaitingASecond(value) {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

function countdownSE() {
  const se = new Audio(
    require('~/assets/sound/05_gameplay/countdown/countdown.mp3')
  )
  se.play()
}

function startSE() {
  const se = new Audio(
    require('~/assets/sound/05_gameplay/game_start/game_start.mp3')
  )
  se.play()
}

function finishSE() {
  const se = new Audio(
    require('~/assets/sound/05_gameplay/game_finish/game_finish.mp3')
  )
  se.play()
}

export default {
  components: {
    Button,
    GameBackground,
    GameCount,
    GameSplash,
    TheWaiter,
    DropZone,
    Fairy,
    Table
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
      currentCount: 0,
      numProblem: 3,
      results: [],
      waiterOffset: 250,
      trash: null,
      previousTrashIndex: null,
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
    styleWaiter() {
      return {
        transform: `translateX(-${this.waiterOffset}px)`
      }
    },
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
    fairiesArray() {
      if (this.area === 'hachioji') {
        return [
          ['combustible', 'incombustible'],
          ['hazardous'],
          ['recyclable', 'oversized']
        ]
      } else {
        return [['combustible', 'incombustible'], ['recyclable', 'oversized']]
      }
    }
  },
  created() {
    this.$route.query.area
      ? (this.area = this.$route.query.area)
      : (this.area = 'chiyoda')
    this.clearResults()
    this.removeTrash()
    this.loadArea()
  },
  mounted() {
    this.$store.commit('bgm/pauseBgm')
    this.startGame()
  },
  methods: {
    answered(obj) {
      console.log('answered')
      if (obj.solved) {
        this.subtractFairy({ key: obj.type, num: 1 })
      }
      this.pushResult(obj)
      // this.incrementCount()
      this.moveWaiter()
    },
    skipAnswer() {
      console.log('skip answer')
      this.removeTrash()
      this.pushResult({
        solved: false,
        answer: null,
        ...this.trash
      })
      // this.incrementCount()
      this.resetWaiter()
    },
    subtractFairy({ key, num }) {
      this.$store.commit(`${this.area}/subtractFairy`, {
        key: key,
        num: num
      })
    },
    clearResults() {
      this.$store.commit('result/clearResults')
    },
    removeTrash() {
      this.$store.commit('trash/removeTrash')
    },
    pushResult(obj) {
      this.$store.commit('result/pushResult', obj)
    },
    incrementCount() {
      this.currentCount++
    },
    resetWaiter() {
      if (this.currentCount >= this.numProblem) {
        this.finishGame()
        return
      }
      this.incrementCount()
      this.removeTrash()
      const innerWidth = window.innerWidth
      this.selectTrash()
      this.$nextTick(() => {
        this.anime = this.$anime({
          targets: '#waiter',
          translateX: [-this.waiterOffset, innerWidth + this.waiterOffset],
          easing: 'linear',
          duration: 22000
        })
        this.anime.finished.then(this.skipAnswer)
      })
    },
    moveWaiter() {
      console.log('move waiter')
      this.anime.pause()
      this.anime = this.$anime({
        targets: '#waiter',
        translateX: innerWidth + this.waiterOffset,
        easing: 'linear',
        duration: 3000
      })
      this.anime.finished.then(this.resetWaiter)
    },
    selectTrash() {
      let index = Math.floor(Math.random() * this.trashes.length)
      while (index === this.previousTrashIndex) {
        index = Math.floor(Math.random() * this.trashes.length)
      }
      this.trash = this.trashes[index]
      this.$store.commit('trash/generateTrash', this.trash)
      this.previousTrashIndex = index
    },
    loadArea() {
      const trashes = require(`~/data/${this.area}.json`)
      this.trashes = trashes
    },
    clearLocalStorage() {
      localStorage.clear()
    },
    finishGame() {
      this.$store.commit('bgm/pauseBgm')
      finishSE()

      this.trash = null
      this.removeTrash()
      this.splashMsg = 'FINISH!'
      window.setTimeout(() => {
        this.$router.push({ path: 'result', query: { area: this.area } })
      }, 2000)
    },
    async startGame() {
      this.showModal = false
      this.showSplash = true
      this.splashMsg = '3'
      countdownSE()
      this.splashMsg = await returnValueAfterWaitingASecond('2')
      countdownSE()
      this.splashMsg = await returnValueAfterWaitingASecond('1')
      countdownSE()
      this.splashMsg = await returnValueAfterWaitingASecond('START!')
      startSE()
      this.splashMsg = await returnValueAfterWaitingASecond('')
      this.resetWaiter()

      const music = new Audio(
        require('~/assets/sound/05_gameplay/bgm/play_bgm_02.mp3')
      )
      this.$store.commit('bgm/changeBgm', { newBgm: music })
      this.$store.commit('bgm/playBgm')
    }
  }
}
</script>

<style lang="scss" scoped>
.splash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  // background: linear-gradient(#8f6f5d, #8c683d);
  // overflow: hidden;
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
.table-list {
  position: absolute;
  top: 190px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0 40px;
  &__item {
    list-style: none;
  }
}
.table-item {
  width: 300px;
}
.fairy-list {
  display: flex;
  justify-content: space-around;
  width: 100%;
  &__item {
    list-style: none;
  }
}
.waiter {
  position: absolute;
  bottom: 40px;
}
</style>
