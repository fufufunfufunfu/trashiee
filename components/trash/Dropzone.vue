<template>
  <div class="drop-zone">
    <Fairy :type="listKey" class="drop-zone__fairy" :state="state" />
    <draggable
      v-model="list"
      :group="{ name: 'TRASH' }"
      class="drop-zone__drop"
      @change="onChange"
    >
      <div v-if="list[0]">
        <Trash :trash="list[0]" />
      </div>
    </draggable>
  </div>
</template>

<script>
import Trash from '~/components/trash/Trash.vue'
import Fairy from '~/components/game/Fairy.vue'

function waitAMoment() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}

function correctSE() {
  const se = new Audio(
    require('~/assets/sound/05_gameplay/correct_answer/correct.mp3')
  )
  se.play()
}

function incorrectSE() {
  const se = new Audio(
    require('~/assets/sound/05_gameplay/incorrect_answer/incorrect_01.mp3')
  )
  se.play()
}

export default {
  name: 'DropZone',
  components: {
    Trash,
    Fairy
  },
  props: {
    listKey: {
      type: String,
      required: true,
      validator(value) {
        return [
          'combustible',
          'incombustible',
          'recyclable',
          'oversized',
          'hazardous'
        ].includes(value)
      }
    }
  },
  data() {
    return {
      state: 'normal'
    }
  },
  computed: {
    list: {
      get() {
        console.log(this.$store.state.trash[this.listKey])
        return this.$store.state.trash[this.listKey]
      },
      set(value) {
        this.$store.commit('trash/updateList', {
          listKey: this.listKey,
          trash: value
        })
      }
    }
  },
  methods: {
    onChange(evt) {
      console.log(evt)
      const trash = this.list[0]
      if (trash === undefined) return false
      if (trash.type === this.listKey) {
        correctSE()
        this.state = 'good'
        this.$emit('answered', {
          solved: true,
          answer: this.listKey,
          ...trash
        })
        waitAMoment().then(() => {
          this.state = 'normal'
        })
        return true
      } else {
        incorrectSE()
        this.state = 'bad'
        this.returnToWaiter()
        this.$nextTick(() => {
          this.$emit('answered', {
            solved: false,
            answer: this.listKey,
            ...trash
          })
          waitAMoment().then(() => {
            this.state = 'normal'
          })
          return false
        })
      }
    },
    returnToWaiter() {
      console.log(this.list[0])
      const trash = this.list[0]
      if (trash === undefined) return
      this.list = []
      this.$store.commit('trash/updateList', {
        listKey: 'waiter',
        trash: [trash]
      })
      console.log(this.$store.state.trash)
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-zone {
  position: relative;
  width: 120px;
  height: 120px;

  &__fairy {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    height: 100%;
  }
  &__drop {
    position: absolute;
    top: 100px;
    width: 100%;
    height: 100%;
  }
}
</style>
