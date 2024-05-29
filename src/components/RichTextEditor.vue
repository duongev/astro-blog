<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// @ts-ignore-next-line
import ImageUploader from 'quill-image-uploader'
import htmlEditButton from "quill-html-edit-button";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import {app} from "../firebase/client.ts";
import * as fireRef from "firebase/storage";
import {getDownloadURL, getStorage, uploadBytes} from "firebase/storage";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
    console.log('uid', uid);
  } else {
    // User is signed out
    // ...
    console.log('log out')
  }
});

const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
}

const modules = [{
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file: any) => {
      return new Promise(async (resolve, reject) => {
        const storage = getStorage(app);

        // Create a storage reference from our storage service
        const storageRef = fireRef.ref(storage, `images/${Date.now()}_${file.name}`);
        // 'file' comes from the Blob or File API
        try {
          const url = await uploadBytes(storageRef, file).then((snapshot) => {
            return getDownloadURL(fireRef.ref(storage, snapshot.metadata.fullPath))
          });
          resolve(url);
        } catch (e) {
          reject('Upload failed')
        }
        return
      })
    }
  }
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
  <button type="button" class="mb-2" @click="signIn" style="margin: 1rem 0">Thêm media</button>
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
