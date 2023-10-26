<template>
  <div class=" inline-block md:h-28 md:w-28 w-14 h-14" @click="dialogVisible = true">
    <!-- 不具名图片样式 -->
    <img :src="img.src" :alt="img.name" v-if="!img.named" class=" md:h-28 md:w-28 w-14 h-14 aspect-square">
    <!-- 具名图片样式 -->
    <img :src="img.src" :alt="img.name" v-if="img.named" class=" h-24 w-28">
    <p v-if="img.named" class=" text-center font-light w-full text-sm">{{img.name}}</p>

    <el-dialog v-model="dialogVisible" title="图片编辑">
      <el-form :model="form" label-position="left">
        <el-form-item label="是否命名" :label-width="formLabelWidth">
          <el-switch v-model="form.needName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="!form.needName"/>
        </el-form-item>
        <div class="flex justify-evenly">
          <div class="w-40 h-40">
            <vue-cropper
              ref="cropper"
              :img="form.src"
              autoCrop fixed centerBox
            />
            <el-button @click="preview">预览</el-button>
          </div>
          <img v-if="previewSrc !== ''" :src="previewSrc" class="w-40 h-40">
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button  @click="handleImageEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElDialog, ElForm, ElFormItem, ElSwitch, ElInput, ElButton } from 'element-plus'
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";

const props = defineProps({src: String})
const emit = defineEmits(['changeImage'])
// data
const dialogVisible = ref(false);
const img = reactive({
  named: false,
  name: '',
  src:props.src
})
const form = reactive({
  needName: false,
  name: '',
  src: props.src
});
const previewSrc = ref('');
// ref
const cropper = ref(null);
// form
const formLabelWidth ='100px'
function handleImageEdit() {
  dialogVisible.value = false;
  img.named = form.needName;
  img.name = form.name;
  cropper.value.getCropData((data) => {
    img.src = data
  })
}
function preview() {
  cropper.value.getCropData((data) => {
    previewSrc.value = data
  })
}
</script>

<style>

</style>