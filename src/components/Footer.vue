<template>
  <div class="fixed bottom-4 left-4" @click="info()">
    <button
    title="更多信息" 
    class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
    transition duration-500 ease transform hover:scale-125 opacity-80">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </button>
  </div>

   <el-drawer
    v-model="state.openDrawer"
    direction="ltr"
    size="50%"
  >
  <div class="px-4 text-indigo-900 text-light text-lg text-left leading-8">
      <div class="mb-8">
        <h1 class="text-2xl">这是什么</h1>
        <p>这是一个用于制作排名的网站，你可以方便的上传本地图片生成图表,再导出为图片与朋友们分享</p>
      </div>
      <div class="my-8">
        <h1  class="text-2xl">如何使用</h1>
        <p>①在图表左上方输入图表名称，这会作为导出图片的名称</p>
        <p>②在Pool中上传本地图片</p>
        <p>③通过按钮+-来增加或减少行数</p>
        <p>④在图表每行最左边输入行名以及切换颜色（行名右下角）</p>
        <p>⑤在图表右上方按钮切换色卡</p>
        <p>⑥点击图表右侧按钮导出图片</p>
      </div>
      <div class="my-8">
        <h1 class="text-2xl">其他信息</h1>
        <a href="https://github.com/vimerio-mu/rank-it">
          <img :src="githubUrl" alt="" class=" h-16 w-16 rounded-full inline-block mt-4 mr-4">
        </a>
        <a href="https://space.bilibili.com/4793005">
          <img :src="avatarUrl" alt=""  class=" h-16 w-16 rounded-full inline-block mt-4">
        </a>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { ElDrawer } from 'element-plus';
import avatarUrl from '/avatar.jpg'
import githubUrl from '/github.png'
const state = reactive({
  openDrawer: true,
})

function info() {
  state.openDrawer = true;
}
</script>

<style>

</style>