<template>
  <div class="table">
    <slot></slot>
    <img src="~/assets/image/table.svg" alt="" class="table__image" />
  </div>
</template>

<style lang="scss" scoped>
.table {
  &__image {
    width: 100%;
  }
}
</style>

<script>
export default {
  name: 'Table'
}
</script>
