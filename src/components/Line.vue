<template>
  <div class=" min-h-28 flex flex-row">
    <div contenteditable="true" ref="container"
    class="relative w-44 min-h-28 text-center text-3xl text-white flex items-center justify-center border-1 border-black overflow-hidden" >
      <span class=" overflow-hidden">{{name}}</span>
      <button v-if="!output" class="h-8 w-8 bg-white rounded-full absolute -bottom-4 -right-4 duration-500 hover:bottom-0 hover:right-0 " @click.stop="(el) => el">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-500 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
      <!-- <input type="color" ref="colorSelector" class="h-8 w-8 border-none bg-transparent absolute top-1/2 -right-4 -translate-y-1/2" @change="el => setColor(el.target.value)"> -->
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
import { onMounted, reactive, ref } from 'vue'
import draggable from "vuedraggable";
export default {
  components: { 
    Item, 
    draggable,
     },
  props: {
    name:String,
    color:String,
    data:Array
  },
  setup(props) {
    let output = reactive(false)
    const container = ref(null)
    // 传入左边名称框的颜色
    onMounted(() => {
      output = true
      container.value.className += ` ${props.color ? props.color : 'bg-black'} `;
      })
    function setColor(value) {
      console.log(value)
      console.log(container.value.style)
      container.value.style.backgroundColor = value
    }
    return {
      container,
      output,
      setColor
    } 
  }

}

</script>

<style>

</style>