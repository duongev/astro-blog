<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// @ts-ignore-next-line
import ImageUploader from 'quill-image-uploader'
import htmlEditButton from "quill-html-edit-button";
import {getAuth, onAuthStateChanged, signInWithCustomToken, signInWithPopup} from "firebase/auth";
import {app} from "../firebase/client.ts";
import * as fireRef from "firebase/storage";
import {getDownloadURL, getStorage, uploadBytes} from "firebase/storage";

const auth = getAuth(app);
const storage = getStorage(app);

const props = defineProps({
  post: {
    title: String,
    content: String,
    createAt: Date
  }
})

const pageData = ref<any>(props.post || {content: ""})

const modules = [{
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file: any) => {
      return new Promise(async (resolve, reject) => {
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
      })
    }
  }
}, {
  name: 'htmlEditButton',
  module: htmlEditButton,
}]

const quillEditor = ref(null)

const quillImageCallback = async (file:any) => {
  const quillUpload = document.getElementsByClassName("ql-image")[0];
  quillUpload?.click();
}

function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log('logged')
    } else {
      // User is signed out
      signInWithCustomToken(auth, getCookie("__token") || "")
    }
  });

})
</script>

<template>
  <button type="button" class="mb-2" @click="quillImageCallback" style="margin: 1rem 0">Add media</button>
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
