<template>
  <div
  class=" bg-white shadow-xl shadow-indigo-500/50 rounded-xl col-span-3 my-8 flex ">
    <div class=" my-8 mx-4 text-center">
      <p class=" text-indigo-500 font-semibold text-xl mb-4"> Color Settings</p>
      <div class=" flex border-indigo-500 border-b-2 pb-4">
          <ColorItem
          v-for="(color,index) in blue"
          :key="index"
          :color="color"/>
      </div>
    </div>
  </div>
</template>

<script>
import ColorItem from './ColorItem.vue'

export default {
  components: {ColorItem},
  props:{},
  setup() {
    const blue = ['bg-blue-700','bg-blue-600','bg-blue-500','bg-blue-400','bg-blue-300']
    return {blue}
  }
}
</script>

<style>

</style>