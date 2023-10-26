<script setup>
import Line from './Line.vue'
import ColorItem from './ColorItem.vue'
import draggable from "vuedraggable";
import domtoimage from 'dom-to-image';
import { onMounted, reactive, ref } from "vue";
import defaultLines from '../constant/default';
import swatch from '../constant/colorSwatch';
import btnSvg from '../svg/btns';
import { ElDialog, ElTable,ElTableColumn,ElButton } from 'element-plus';
const state = reactive({
  name: '图表标题',
  lines: defaultLines,
  pool: []
})

const colorSwatch = reactive({
  open: false,
  swatchs: swatch
})
const dropZone = ref(null)
function addLine() {
  state.lines.push(
    {
      name:'NEW',
      id: state.lines.length > 0 ? state.lines[state.lines.length - 1].id + 1 : 0,
      color:'',
      data:[]
    },)
}

function popLine() {
  const deletedLine = state.lines.pop();
  state.pool.push(...deletedLine.data);
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
  file.value = null;
  file.click();
}
onMounted(() => {
  dropZone.value.addEventListener("dragenter", function (event) {
    dropZone.value.classList.remove('bg-indigo-500/10');
    dropZone.value.classList.add('bg-indigo-500/50');
  });
  dropZone.value.addEventListener("dragleave", function (event) {
    dropZone.value.classList.remove('bg-indigo-500/50');
    dropZone.value.classList.add('bg-indigo-500/10');
  });
  dropZone.value.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  dropZone.value.addEventListener("drop", function (event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  });
})

function getFiles() {
  let input = document.querySelector('#file');
  handleFiles(input.files);
}
function handleFiles(files) {
  // 使用fileReader来读取文件，绕过浏览器安全策略
  for(let i = 0; i < files.length; i++) {
    let fileReader= new FileReader()
    let fileType = files[i].type;
    let lastId = state.pool[state.pool.length - 1] ? state.pool[state.pool.length - 1].id + 1 : 0
    let havedFlag = false;
    fileReader.onload=function(){
      if(/^image\/[jpg|png|webp|gif]/.test(fileType)) {
        for(let img of state.pool) {
          if(img.src === this.result) {
            havedFlag = true
          }
        }
        !havedFlag && state.pool.push(
          {
            id:lastId,
            src:this.result
          }
        )
      }
    }
    //base64方式读取：图片等文件通用读取方式
    fileReader.readAsDataURL(files[i]);
  }
}

function selectColor(name) {
  for(let i = 0; i < colorSwatch.swatchs.length; i++) {
    if(colorSwatch.swatchs[i].name == name) {
      for(let j = 0; j < state.lines.length; j++) {
        state.lines[j].color = colorSwatch.swatchs[i].colors[j]
      }
    }
  }
}

function handleChange(evt,id) {
  let line;
  if(id >= 0) {
    line = state.lines[id].data
  }else {
    // id = -1 为 pool
    line = state.pool
  }
  if(evt.added && line.indexOf(evt.added.element) === -1) {
    line.push(evt.added.element);
  }
  if(evt.removed) {
    const needDeleteIndex = line.indexOf(evt.removed.element)
    line.splice(needDeleteIndex,1)
  }
}

</script>
  
<template>
  <div class="flex flex-col col-span-12 relative">
    <!-- 色卡 -->
    <div class="absolute top-4 right-0 hover:-top-4 hover:scale-125 duration-500 " @click="colorSwatch.open = true">
        <button
        title="选择色卡"
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50">
          <div v-html="btnSvg.swatch"></div>
        </button>
    </div>
    <!-- 色卡弹出对话框 -->
    <el-dialog v-model="colorSwatch.open" title="色卡选择">
      <el-table :data="colorSwatch.swatchs">
        <el-table-column property="name" label="名称" class=" text-indigo-500"/>
        <el-table-column property="colors" label="色号">
          <template #default="scope" >
            <div class=" flex flex-row">
              <ColorItem 
                v-for="(color,index) in scope.row.colors" 
                :key="index"
                :color='color' 
              />
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
    <!-- 小技巧：用span的min-width撑开父元素，并设置内容和input一样，里面的input设置的width:100%就可以随内容撑大 -->
    <div class="absolute top-4 left-0 z-0 hover:-top-4 duration-500">
      <span class="min-w-56 inline-block text-center font-bold text-2xl px-8">{{state.name}}</span>
      <input type="text" class=" text-indigo-500 font-bold text-2xl h-16 w-full rounded-xl text-center focus:outline-none inline-block absolute left-0 px-8 " v-model="state.name" />
    </div>
    <div class="bg-white shadow-xl rounded-xl shadow-indigo-500/50 mt-8 mb-4 pt-4 pb-8 pl-4 pr-8 relative">
      <draggable 
        id = 'graph'
        class="z-10"
        v-model="state.lines" 
        :sort="true"
        group="line"
        animation="300"
        item-key="name">
        <template #item="{ element }">
          <Line 
            :color="element.color" 
            :name="element.name" 
            :data="element.data" 
            :id="element.id" 
            @data-change="handleChange"
          />
        </template>
      </draggable>
      <!-- 下载为图片 -->
      <div class="absolute bottom-1/2 translate-y-1/2 right-2" @click="download()">
        <button
          title="下载为图片"
          class="btn hover:rotate-360"
        >
          <div v-html="btnSvg.download"></div>
        </button>
      </div>
      <!-- 增加行 -->
      <div class="absolute left-1/2 translate-y-1/2 -translate-x-1/2 bottom-8" @click="addLine()">
        <button 
          title="增加行"
          class="btn hover:rotate-180"
        >
          <div v-html="btnSvg.plus"></div>
        </button>
      </div>
      <!-- 减少行 -->
      <div class="absolute left-1/2 translate-y-1/2 translate-x-1/2 bottom-8" @click="popLine()">
        <button 
          title="减少行"
          class="btn hover:rotate-180"
        >
          <div v-html="btnSvg.minus"></div>
        </button>
      </div>
    </div>

    <div class="bg-white shadow-xl rounded-xl shadow-indigo-500/50 my-4 py-4 pl-4 pr-8 relative">
      <!-- Pool -->
      <Line 
        color=""
        name="Pool"
        :data="state.pool"
        :id=-1
        @data-change="handleChange"
      >
      <template #name>
        <div 
          ref="dropZone" 
          class="relative md:w-44 w-24 min-h-28 text-center flex items-center justify-center border-2 border-dashed border-indigo-500 bg-indigo-500/10 cursor-pointer" 
          @click="upload"
        >
          点击或拖拽上传图片
          <input id="file" type="file" accept="image/*" class=" opacity-0 absolute bottom-1/2 translate-y-1/2 right-2 w-12 h-12 z-0" @change="getFiles" multiple="multiple">
        </div>
      </template>
      </Line>
      <!-- 上传图片 -->
      <!-- <div class="absolute bottom-1/2 translate-y-1/2 right-2 z-20">
        <button 
        class="btn hover:-rotate-360"
        title="上传图片"
        @click="upload">
          <div v-html="btnSvg.upload"></div>
        </button>
      </div>
      <input id="file" type="file" accept="image/*" class=" opacity-0 absolute bottom-1/2 translate-y-1/2 right-2 w-12 h-12 z-0" @change="getFiles" multiple="multiple"> -->
    </div>
  </div>
</template>
  
<style lang="postcss" scoped>
.btn {
  @apply rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50 transition duration-500 transform hover:scale-125
}
</style>