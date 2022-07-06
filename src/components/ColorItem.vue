<template>
  <div ref="container" class=" rounded-full aspect-square h-8 w-8 mx-1">

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
    onMounted(() => container.value.className += ` ${props.color ? props.color : 'bg-black'} `)
    return {
      container
    } 
  }
}
</script>

<style>

</style>