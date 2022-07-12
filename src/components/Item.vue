<template>
  <div class=" inline-block md:h-28 md:w-28 w-14 h-14">
    <!-- 不具名图片样式 -->
    <img :src="src" :alt="name" v-if="!named" class=" md:h-28 md:w-28 w-14 h-14 aspect-square">
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