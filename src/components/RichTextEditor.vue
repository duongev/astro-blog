<script setup lang="ts">
import { createVNode, onMounted, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// @ts-ignore-next-line
import ImageUploader from 'quill-image-uploader'
import htmlEditButton from "quill-html-edit-button";


const modules = [{
  name: 'imageUploader',
  module: ImageUploader,
  // options: {
  //   upload: (file: any) => {
  //     return new Promise((resolve, reject) => {
  //       const formData = new FormData()
  //       formData.append('file', file)
  //       request({
  //         method: 'POST',
  //         url: 'media/upload',
  //         data: formData
  //       })
  //           .then((res: any) => {
  //             resolve(apiUrl + res.url)
  //           })
  //           .catch((err) => {
  //             console.log('err', err)
  //             reject('Upload failed')
  //             message.error('Upload failed')
  //           })
  //     })
  //   }
  // }
}, {
  name: 'htmlEditButton',
  module: htmlEditButton,
}]

const quillEditor = ref(null)

const quillImageCallback = async () => {
  // const quillObj = quillEditor.value.getQuill()
  // quillObj.focus()
  // const range = quillObj.getSelection()
  // quillObj.insertEmbed(
  //   range.index,
  //   'image',
  //   'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/12/demo-la-gi-0.jpg'
  // )
}

const pageData = ref<any>({content:""})

const currentId = ref<number>()

onMounted(() => {
  // const id = route.params.id
  // currentId.value = +id
  // request({
  //   method: 'GET',
  //   url: `/posts/byId/${id}`
  // }).then((res) => {
  //   pageData.value = res
  // })
})
</script>

<template>
  <button class="mb-2" @click="quillImageCallback" style="margin: 1rem 0">Thêm media</button>
  <input type="hidden" id="content" name="content" :value="pageData.content"/>
  <QuillEditor
      ref="quillEditor"
      theme="snow"
      toolbar="full"
      v-model:content="pageData.content"
      contentType="html"
      class="min-h-60"
      :modules="modules"
      style="margin-bottom: 1rem; min-height: 10rem"
  />
</template>

<style scoped>
.box-right {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  min-height: 10rem;
}
.box-right header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}
.box-right footer {
  border-top: 1px solid #dddddd;
  padding-top: 0.5rem;
  text-align: right;
}
</style>
