<template>
  <div class="flex flex-col col-span-12">
    <div class="bg-white shadow-xl rounded-xl shadow-indigo-500/50 mt-8 mb-4 pt-4 pb-8 pl-4 pr-8 relative">
      <draggable 
      id = 'graph'
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
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <div class="absolute left-1/2 translate-y-1/2 bottom-8" @click="addLine()">
        <button 
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div class="absolute left-1/2 translate-y-1/2 translate-x-full bottom-8" @click="minusLine()">
        <button 
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
      color="bg-black "
      name="Pool"
      :data="state.pool"
      />
      <div class="absolute bottom-1/2 translate-y-1/2 right-2">
        <button 
        class="rounded-full bg-indigo-500 text-white w-12 h-12 p-2 shadow-lg shadow-indigo-500/50
        transition duration-500 ease transform hover:scale-125 hover:-rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Line from './Line.vue'
import draggable from "vuedraggable";
import domtoimage from 'dom-to-image';
import { ref, reactive } from "vue";
const state = reactive({
  lines:[
    {
      name:'S',
      color:'#ef4444',
      data:[]
    },
    {
      name:'A',
      color:'#f97316',
      data:[]
    },
    {
      name:'B',
      color:'#f59e0b',
      data:[]
    },
    {
      name:'C',
      color:'#facc15',
      data:[]
    },
    {
      name:'D',
      color:'#a3e635',
      data:[]
    },
  ],
  pool:[
      { id: 1, name: 'china1', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.2Hu-9DWUnrhQ246iYrmWWAHaE8?w=232&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 2, name: 'china2', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.hucNc0ssxrBpM7IBTLkx5gHaE7?w=233&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 3, name: 'china3', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.0b45bmWlDQXh_ClNfbwUxAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 4, name: 'china4', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.FX31vvE8qUeNMi1ZrDeaygEsDI?w=232&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 5, name: 'china5', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.0b45bmWlDQXh_ClNfbwUxAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 6, name: 'china6', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.0b45bmWlDQXh_ClNfbwUxAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 7, name: 'china7', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.2Hu-9DWUnrhQ246iYrmWWAHaE8?w=232&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 8,  src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.hucNc0ssxrBpM7IBTLkx5gHaE7?w=233&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
      { id: 9, name: 'china9', src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.0b45bmWlDQXh_ClNfbwUxAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.24&pid=1.7'},
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
        link.download = 'my-graph.png';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        alert('出现错误，无法下载', error);
    })
}
</script>

<style>

</style>