<template>
    <div id="trash-dish">
      <draggable>
        <span
          id="trash"
          class="game__trash"
          :style="styleTrash"
          :data-trash-type="trash.type"
        >
          <img :src="trash.img" alt="" draggable="false" />
        </span>
      </draggable>
      </div>
</template>

<script>
export default {
  name: 'TheTrash',
  props: {
    trash: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDragging: false,
      dragCoords: {
        x: 0,
        y: 0,
      }
    }
  },
  computed: {
    styleTrash() {
      return {
        position: this.isDragging ? 'fixed' : 'static',
        top: 0,
        left: 0,
        transform: this.isDragging ? `translate(${this.dragCoords.x}px, ${this.dragCoords.y}px)` : 'none'
      }
    }
  },
  methods: {
    // touchMove(e) {
    //   if (this.pending) return
    //   this.isDragging = true
    //   const ele = e.currentTarget
    //   document.documentElement.appendChild(ele)

    //   const touch = e.changedTouches[0]
    //   // ele.style.position = 'fixed'
    //   // ele.style.top =
    //   //   touch.pageY - window.pageYOffset - ele.offsetHeight / 2 + 'px'
    //   // ele.style.left =
    //   //   touch.pageX - window.pageXOffset - ele.offsetWidth / 2 + 'px'
    //   this.dragCoords.x = touch.pageX - window.pageXOffset - ele.offsetWidth / 2
    //   this.dragCoords.y = touch.pageY - window.pageYOffset - ele.offsetHeight / 2
    // },
    // touchEnd(e) {
    //   this.isDragging = false
    //   // ドラッグ中の操作のために変更していたスタイルを元に戻す
    //   const droppedElem = e.currentTarget

    //   // ドロップした位置にあるドロップ可能なエレメントに親子付けする
    //   const touch = event.changedTouches[0]
    //   // スクロール分を加味した座標に存在するエレメントを新しい親とする
    //   const newParentElem = document.elementFromPoint(
    //     touch.pageX - window.pageXOffset,
    //     touch.pageY - window.pageYOffset
    //   )
    //   window.console.log(newParentElem)
    //   if (newParentElem.classList.contains('drop-zone')) {
    //     newParentElem.appendChild(droppedElem)
    //     this.pending = true
    //     this.judgeTrash(newParentElem, droppedElem)
    //   } else {
    //     droppedElem.parentNode.removeChild(droppedElem)
    //     const dish = document.getElementById('trash-dish')

    //     dish.appendChild(droppedElem)
    //   }
    // },
  }
}
</script>