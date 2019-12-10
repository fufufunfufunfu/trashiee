<template>
  <div class="result">
    <div class="result__inner">
      <h1 class="result__title">Score</h1>
      <h2 class="result__score">
        <span class="correct">{{ numCorrectAnswer }}</span
        >/{{ results.length }}問正解！
      </h2>
      <Gauge
        :old="current"
        :current="current"
        :show="showGauge"
        :anime="false"
      />
      <ul class="result__list">
        <li class="result__item">
          <span class="result__trash-img"></span>
          <span class="result__answer">あなたの答え</span>
          <span class="result__arrow"></span>
          <span class="result__answer">正しい分別</span>
        </li>
        <li v-for="(result, i) in results" :key="i" class="result__item">
          <span class="result__trash-img">
            <img :src="result.img" alt="" />
          </span>
          <span
            class="result__answer"
            :class="[
              result.answer,
              $route.query.area === 'nakano' ? 'nakano' : ''
            ]"
            >{{ typeToJapanese(result.answer) }}</span
          >
          <span class="result__arrow">→</span>
          <span
            class="result__answer"
            :class="[
              result.correct,
              $route.query.area === 'nakano' ? 'nakano' : ''
            ]"
            >{{ typeToJapanese(result.correct) }}</span
          >
        </li>
      </ul>
      <div class="result__btn">
        <nuxt-link to="/map">
          <Button>マップにもどる</Button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '~/components/Button'
import Gauge from '~/components/Gauge'

export default {
  components: {
    Button,
    Gauge
  },
  computed: {
    ...mapState('result', ['results']),
    numCorrectAnswer() {
      let count = 0
      this.results.forEach(result => {
        if (result.solved) count++
      })
      return count
    },
    current() {
      window.console.log(this.area)
      window.console.log(this.$store.state[this.area])
      return {
        ...this.$store.state[this.area]
      }
    }
  },
  data() {
    return {
      area: 'chiyoda',
      showGauge: false
    }
  },
  mounted() {
    this.$route.query.area
      ? (this.area = this.$route.query.area)
      : (this.area = 'chiyoda')
    this.$nextTick(() => {
      this.showGauge = true
    })
  },
  filters: {
    typeToJapanese(value) {
      const route = this.$route
      let ja = ''
      switch (value) {
        case 'combustible':
          ja = 'かねんごみ'
          break
        case 'incombustible':
          ja = 'ふねんごみ'
          if (route.query.area === 'nakano') {
            ja = 'とうき・ガラス・金属'
          }
          break
        case 'resources':
          ja = 'しげんごみ'
          break
        case 'oversized':
          ja = 'そだいごみ'
          break
        case 'hazardous':
          ja = 'ゆうがいごみ'
          break
        default:
          ja = '-'
          break
      }
      return ja
    }
  },
  methods: {
    typeToJapanese(type) {
      let ja = ''
      switch (type) {
        case 'combustible':
          ja = 'かねんごみ'
          break
        case 'incombustible':
          ja = 'ふねんごみ'
          if (this.$route.query.area === 'nakano') {
            ja = 'とうき・ガラス・金属'
          }
          break
        case 'resources':
          ja = 'しげんごみ'
          break
        case 'oversized':
          ja = 'そだいごみ'
          break
        case 'hazardous':
          ja = 'ゆうがいごみ'
          break
        default:
          ja = '-'
          break
      }
      return ja
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  padding: 80px;
  background: #fff;
  &__inner {
    padding: 80px;
    background: #f8f8f8;
  }
  &__title {
    font-size: 100px;
    text-align: center;
  }
  &__score {
    font-size: 60px;
    text-align: center;
    border-bottom: #909090 3px solid;
    .correct {
      font-size: 100px;
    }
  }

  &__list {
    margin-bottom: 40px;
  }
  &__item {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__trash-img {
    display: inline-block;
    width: 200px;
    text-align: center;
    margin-right: 40px;
    img {
      width: 150px;
    }
  }
  &__answer {
    display: inline-block;
    width: 260px;
    height: 80px;
    font-size: 32px;
    font-weight: 700;
    line-height: 80px;
    text-align: center;
    &.combustible {
      color: #b72121;
      background: #ffb1b1;
    }
    &.incombustible {
      color: #1a4598;
      background: #b1c7ff;
      &.nakano {
        font-size: 20px;
      }
    }
    &.resources {
      color: #1d957f;
      background: #97ffcd;
    }
    &.oversized {
      color: #d47217;
      background: #ffe5b1;
    }
    &.hazardous {
      color: #a850de;
      background: #e5c5ff;
    }
  }
  &__arrow {
    display: inline-block;
    width: 80px;
    font-size: 48px;
    text-align: center;
  }
  &__btn {
    margin-bottom: 40px;
    text-align: center;
  }
}
</style>
