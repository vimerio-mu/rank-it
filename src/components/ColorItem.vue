<template>
  <div 
  ref="container" 
  class=" rounded-full aspect-square h-8 w-8 mx-1"
  :title="color"
  >
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  components: {},
  props: {
    color: String
  },
  setup(props) {
    const container = ref(null)
    onMounted(() => {
      container.value.style.backgroundColor = ` ${props.color ? props.color : '#000000'} `;
    })
    return {
      container
    } 
  }
}
</script>

<style>

</style>