<template>
  <div class=" inline-block h-28 w-28">
    <!-- 不具名图片样式 -->
    <img :src="src" :alt="name" v-if="!named" class=" h-28 w-28 aspect-square">
    <!-- 具名图片样式 -->
    <img :src="src" :alt="name" v-if="named" class=" h-24 w-28">
    <p v-if="named" class=" text-center font-light w-full text-sm">{{name}}</p>
  </div>
</template>

<script>
export default {
  props:{
    src:String,
    name:String
  },
  setup(props) {
    const named = props.name !== undefined
    return {
      named
    }
  },
}
</script>

<style>

</style>