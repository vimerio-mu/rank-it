<template>
  <div 
    ref="container" 
    class=" rounded-full aspect-square h-8 w-8 mx-1"
    :title="color"
  >
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#000000'
  }
})

const container = ref(null)

onMounted(() => {
  container.value.style.backgroundColor = props.color;
})
</script>

<style>

</style>