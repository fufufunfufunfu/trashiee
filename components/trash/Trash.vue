<template>
  <span v-if="trash" id="trash" class="trash" :data-trash-type="trash.type">
    <img :src="trash.img" alt="" class="trash__image" />
  </span>
</template>

<style lang="scss" scoped>
.trash {
  display: inline-block;
  &__image {
    width: 100%;
  }
}
</style>

<script>
export default {
  name: 'TheTrash',
  props: {
    trash: {
      type: Object,
      required: true
    }
  }
}
</script>
