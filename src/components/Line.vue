<template>
  <div class=" min-h-28 flex flex-row">
    <div contenteditable="true" ref="container"
    class=" w-44 min-h-28 text-center text-3xl text-white flex items-center justify-center border-1 border-black overflow-hidden" >
      <span class=" overflow-hidden">{{name}}</span>
    </div>
    <draggable 
      v-model="data" 
      :sort="true"
      group="item"
      animation="300"
      class="min-h-28 w-full bg-stone-900 text-white border-black border-b-2 box-border flex-1 flex flex-row flex-wrap"
      item-key="id"
      >
        <template #item="{ element }">
          <Item
          :src="element.src"
          :name='element.name'
          />
        </template>
    </draggable>
  </div>
</template>

<script >
import Item from './Item.vue'
import { onMounted, ref } from 'vue'
import draggable from "vuedraggable";

export default {
  components: { Item, draggable},
  props: {
    name:String,
    color:String,
    data:Array
  },
  setup(props) {
    const container = ref(null)
    // 传入左边名称框的颜色
    onMounted(() => container.value.className += ` ${props.color ? props.color : 'bg-black'} `)
    return {
      container
    } // 这里返回的任何内容都可以用于组件的其余部分
  }

}

</script>

<style>

</style>