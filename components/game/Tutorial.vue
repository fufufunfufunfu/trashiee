<template>
  <div class="tutorial">
    <div class="tutorial__image-container">
      <img
        src="~/assets/image/tutorial.png"
        alt=""
        class="tutorial__image"
      />
    </div>
    <ul class="tutorial__btn-list btn-list">
      <li class="btn-list__item btn-item">
        <Button class="tutorial__btn" @click="startGame">もどる</Button>
      </li>
      <li class="btn-list__item btn-item">
        <Button class="tutorial__btn" @click="startGame">OK</Button>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
  name: 'Tutorial',
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.tutorial {
  width: calc(100vw - 80px);
  height: calc(100vh - 60px);
  margin: 30px 40px;
  padding: 24px 72px;
  background: #ffe9c9;
  border-radius: 40px;
  &__image-container {
    width: 100%;
    height: calc(100% - 80px);
    margin-bottom: 16px;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__btn-list {
      margin: 0 40px;
  }
  .btn-list {
      display: flex;
      justify-content: space-between;
      &__item {
          list-style: none;
      }
  }
  .btn-item {
      
  }
}
</style>
