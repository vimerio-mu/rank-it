<template>
  <div class="fixed bottom-4 left-4" @click="openInfo()">
    <button
    title="更多信息" 
    class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
    transition duration-500 ease transform hover:scale-125 opacity-80">
      <div v-html="btnSvg.info"></div>
    </button>
  </div>

   <el-dialog
    v-model="state.openDrawer"
    :show-close="false"
    direction="ltr"
    width="30%"
    class="bg-indigo-500/10"
  >
  <div class="px-4 text-indigo-900 text-light text-lg text-left leading-8">
      <div class="mb-8">
        <h1 class="text-2xl">{{info.what.title}}</h1>
        <p v-for="item of info.what.list" :key="item">{{item}}</p>
      </div>
      <div class="my-8">
        <h1  class="text-2xl">{{info.how.title}}</h1>
        <p v-for="item of info.how.list" :key="item">{{item}}</p>
      </div>
      <div class="my-8">
        <h1 class="text-2xl">{{info.about.title}}</h1>
        <a :href='info.about.list[0]'>
          <img :src="githubUrl" alt="" class=" h-16 w-16 rounded-full inline-block mt-4 mr-4">
        </a>
        <a :href='info.about.list[1]'>
          <img :src="avatarUrl" alt=""  class=" h-16 w-16 rounded-full inline-block mt-4">
        </a>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { ElDrawer, ElDialog } from 'element-plus';
import avatarUrl from '/avatar.jpg';
import githubUrl from '/github.png';
import btnSvg from '../svg/btns';
import info from '../constant/info';
const state = reactive({
  openDrawer: true,
})

function openInfo() {
  state.openDrawer = true;
}
</script>

<style>

</style>