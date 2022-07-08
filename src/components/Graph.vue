<template>
  <div class="flex flex-col col-span-12">
    <div class="bg-white shadow-xl rounded-xl shadow-indigo-500/50 mt-8 mb-4 pt-4 pb-8 pl-4 pr-8 relative">
      <div class="bg-white rounded-xl h-16 w-56 absolute -top-12 left-0 z-0">
        <input type="text" class=" text-indigo-500 font-bold text-2xl h-12 w-56 rounded-xl text-center" v-model="state.name" />
      </div>
      <draggable 
      id = 'graph'
      class="z-10"
      v-model="state.lines" 
      :sort="true"
      group="line"
      animation="300"
      item-key="name">
        <template #item="{ element }">
          <Line :color="element.color" :name="element.name" :data="element.data" />
        </template>
      </draggable>
      <div class="absolute bottom-1/2 translate-y-1/2 right-2" @click="download()">
        <button
        title="下载为图片"
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
      <div class="absolute left-1/2 translate-y-1/2 bottom-8" @click="addLine()">
        <button 
        title="增加列"
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div class="absolute left-1/2 translate-y-1/2 translate-x-full bottom-8" @click="minusLine()">
        <button 
        title="减少列"
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>

    <div class="bg-white shadow-xl rounded-xl shadow-indigo-500/50 my-4 py-4 pl-4 pr-8 relative">
      <Line 
      color=""
      name="Pool"
      :data="state.pool"
      />
      <div class="absolute bottom-1/2 translate-y-1/2 right-2 z-20">
        <button 
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:-rotate-360"
        title="上传图片"
        @click="upload">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
      </div>
      <input id="file" type="file" accept="image/*" class=" opacity-0 absolute bottom-1/2 translate-y-1/2 right-2 w-12 h-12 z-0" @change="getFile">
    </div>
  </div>
</template>

<script setup>
import Line from './Line.vue'
import draggable from "vuedraggable";
import domtoimage from 'dom-to-image';
import { ref, reactive } from "vue";
const state = reactive({
  name:'图表标题',
  lines:[
    {
      name:'S',
      color:'#b454fd',
      data:[]
    },
    {
      name:'A',
      color:'#6366f1',
      data:[]
    },
    {
      name:'B',
      color:'#4b8dfe',
      data:[]
    },
    {
      name:'C',
      color:'#04c6e2',
      data:[]
    },
    {
      name:'D',
      color:'#02deba',
      data:[]
    },
  ],
  pool:[]
})
function addLine() {
  state.lines.push(
    {
      name:'NEW',
      color:'',
      data:[]
    },)
}

function minusLine() {
  // TODO: 获取更改后的lines的data并将其退回到pool中
  console.log(state.lines.pop())
}

function download() {
  domtoimage.toPng(document.getElementById('graph'))
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `${state.name}.png`;
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        alert('出现错误，无法下载', error);
    })
}

function upload() {
  let file = document.querySelector('#file');
  file.click();
}

function getFile(e) {
  console.log(`文件名称：${e.target.value}`);
  // 使用fileReader来读取文件，绕过浏览器安全策略
  let input = document.querySelector('#file');
	let fileReader=new FileReader(),fileType=input.files[0].type;
  let lastId = state.pool[state.pool.length - 1] ? state.pool[state.pool.length - 1].id + 1 : 0
	fileReader.onload=function(){
		if(/^image\/[jpg|png|gif]/.test(fileType)){
			  state.pool.push({
      id:lastId,
      src:this.result
    })
		}
	}
	console.log(input.files[0]);
	//base64方式读取：图片等文件通用读取方式
	fileReader.readAsDataURL(input.files[0]);
}
</script>

<style>

</style>