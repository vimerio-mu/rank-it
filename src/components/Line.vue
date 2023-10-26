<script setup>
  import Item from './Item.vue'
  import { onMounted, onUpdated, ref, watchEffect } from 'vue'
  import draggable from "vuedraggable";
  import { ElColorPicker } from 'element-plus'
  import predefineColors from '../constant/predefineColors'
  const props = defineProps({
      id:Number,
      name:String,
      color:String,
      data:Array
  });
  let data = ref(props.data)
  watchEffect(() => {
    data = props.data
  })
  
  const emit = defineEmits(['dataChange']);
  const container = ref(null);
  // 传入左边名称框的颜色
  onMounted(() => {
    if(container.value !== null) container.value.style.backgroundColor = ` ${props.color ? props.color : '#000000'} `;
  });
  onUpdated(() => {
    if(container.value !== null) container.value.style.backgroundColor = ` ${props.color ? props.color : '#000000'} `;
  });
  function setColor(value) {
    if(container.value !== null) container.value.style.backgroundColor = value
  };
  function handleChange(evt) {
    emit('dataChange',evt,props.id);
  };
  </script>
  
<template>
  <div class=" min-h-28 flex flex-row">
    <slot name="name">
      <div contenteditable="true" ref="container"
      class="relative md:w-44 w-24 min-h-28 text-center text-3xl text-white flex items-center justify-center border-1 border-black overflow-hidden outline-none" >
        <span class=" overflow-hidden">{{name}}</span>
        <!-- 颜色选择器 -->
        <button class="absolute -bottom-6 -right-6 duration-500 hover:bottom-0 hover:right-0 " >
          <el-color-picker v-model="color" :predefine="predefineColors" @change="setColor"/>
        </button>
      </div>
    </slot>
    <draggable 
      v-model="data" 
      sort
      group="item"
      animation="300"
      class="min-h-28 w-full bg-stone-900 text-white border-black border-b-2 box-border flex-1 flex flex-row flex-wrap"
      item-key="id"
      @change="handleChange"
      >
        <template #item="{ element }">
          <Item
          :src="element.src"
          />
        </template>
    </draggable>
  </div>
</template>
  
<style>
</style>