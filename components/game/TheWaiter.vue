<template>
  <div class="waiter">
    <div class="waiter__image-container">
      <img src="~/assets/image/waiter.png" alt="" class="waiter__image" />
    </div>
    <draggable v-model="list" :group="{ name: 'TRASH' }" class="waiter__trash">
      <Trash v-if="list[0]" :trash="list[0]" />
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
.waiter {
  display: flex;
  align-items: center;
  &__image-container {
    width: 120px;
  }
  &__image {
    width: 100%;
  }
  &__trash {
    width: 100px;
    height: 100px;
  }
}
</style>

<script>
import Trash from '~/components/trash/Trash.vue'

export default {
  name: 'TheWaiter',
  components: {
    Trash
  },
  props: {
    trash: {
      type: Object,
      required: true
    }
  },
  computed: {
    list: {
      get() {
        console.log(this.$store.state.trash.waiter)
        return this.$store.state.trash.waiter
      },
      set(value) {
        this.$store.commit('trash/updateList', {
          listKey: 'waiter',
          trash: value
        })
      }
    }
  },
  created() {
    this.list = [this.trash]
  }
}
</script>
