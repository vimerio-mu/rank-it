<template>
  <div class="flex flex-col col-span-12 relative">
    <!-- 色卡 -->
    <div class="absolute top-4 right-0 hover:-top-4 hover:scale-125 duration-500 " @click="colorSwatch.open = true">
        <button
        title="选择色卡"
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>
    </div>
    <!-- 色卡弹出对话框 -->
    <el-dialog v-model="colorSwatch.open" title="色卡选择"  class=" text-indigo-500">
      <el-table :data="colorSwatch.swatchs">
        <el-table-column property="name" label="名称" class=" text-indigo-500"/>
        <el-table-column property="colors" label="色号">
          <template #default="scope" >
            <div class=" flex flex-row">
              <div 
              v-for="(color,index) in scope.row.colors" 
              :key="index"
              >
              <ColorItem :color='color' />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="colors" label="选择">
          <template #default="scope">
            <el-button color="#6366f1" :dark="isDark" plain @click="selectColor(scope.row.name)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 标题 -->
    <!-- TODO: 需不需要做成抽拉样式，用户刚进来会不会不知道标题设置？ -->
    <div class="absolute top-4 left-0 z-0 hover:-top-4 duration-500">
      <span class="min-w-56 inline-block text-center font-bold text-2xl px-8">{{state.name}}</span>
      <input type="text" class=" text-indigo-500 font-bold text-2xl h-16 w-full rounded-xl text-center focus:outline-none inline-block absolute left-0 px-8 " v-model="state.name" />
    </div>
    <div class="bg-white shadow-xl rounded-xl shadow-indigo-500/50 mt-8 mb-4 pt-4 pb-8 pl-4 pr-8 relative">
      <!-- 标题 -->
       <!-- 奇技淫巧：用span的min-width撑开父元素，并设置内容和input一样，里面的input设置的width:100%就可以随内容撑大 -->
      <!-- <div class="absolute -top-12 left-0">
        <span class="min-w-56 inline-block text-center font-bold text-2xl px-8">{{state.name}}</span>
        <input type="text" class=" text-indigo-500 font-bold text-2xl h-16 w-full rounded-xl text-center focus:outline-none inline-block absolute left-0 px-8 " v-model="state.name" />
      </div> -->
      <!-- 图表 -->
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
      <!-- 下载为图片 -->
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
      <!-- 增加行 -->
      <div class="absolute left-1/2 translate-y-1/2 -translate-x-1/2 bottom-8" @click="addLine()">
        <button 
        title="增加行"
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <!-- 减少行 -->
      <div class="absolute left-1/2 translate-y-1/2 translate-x-1/2 bottom-8" @click="minusLine()">
        <button 
        title="减少行"
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
      <!-- 上传图片 -->
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
import ColorItem from './ColorItem.vue'
import draggable from "vuedraggable";
import domtoimage from 'dom-to-image';
import { ref, reactive, watch } from "vue";
import { ElDialog, ElTable,ElTableColumn,ElButton } from 'element-plus'
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

const colorSwatch = reactive({
  open: false,
  swatchs: [
    {
      name: '默认',
      colors: ['#b454fd','#6366f1','#4b8dfe','#04c6e2','#02deba']
    },
    { 
      name: '彩虹',
      colors: ['#f87171','#fb923c','#fde047','#a3e635','#2dd4bf']
    },
    {
      name: '黑白',
      colors: ['#2F3542','#57606F','#747D8C','#A4B0BE','#CED6E0']
    },
    {
      name: '一直游到海水变蓝',
      colors: ['#4B72A4','#5587BC','#6997C1','#94B8D5','#B4CAE1']
    },
    {
      name: '马卡龙',
      colors: ['#FEB1BB','#E6C8F8','#CAC9F8','#BCEAE1','#CEFADE']
    },
    {
      name: '布达佩斯大饭店',
      colors: ['#E7768C','#F9A3B7','#FDC2C4','#D0A1A9','#AC7382']
    },
    {
      name: '莫兰迪',
      colors: ['#8895A5','#A0A7B9','#BFCBD9','#B6C4B3','#8DA48D']
    }
  ]
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

// function changeColor() {
//   colorSwatch.open = true
//   for(let i = 0; i < state.lines.length; i++) {
//     state.lines[i].color = colorSwatch.swatchs[1].colors[i]
//   }
// }

function selectColor(name) {
  for(let i = 0; i < colorSwatch.swatchs.length; i++) {
    if(colorSwatch.swatchs[i].name == name) {
      for(let j = 0; j < state.lines.length; j++) {
        state.lines[j].color = colorSwatch.swatchs[i].colors[j]
     }
    }
  }
}
</script>

<style>

</style>