<template>
  <div>
    <button @click="save">save</button>
    <button @click="clear">clear</button>
    <button @click="removeEditor">remove editor</button>
    <button @click="enableEditor">enable editor</button>
  </div>
  <div :id="holder" v-if="editorEnabled"></div>
</template>

<script setup lang="ts">
import {useEditorBuilder} from "./useEditorBuilder.ts";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {editorConfig} from "./editorConfig.ts";

const {holder, editor, initEditor, destroyEditor} = useEditorBuilder()

const editorEnabled = ref(true)

onBeforeUnmount(destroyEditor)

const removeEditor = () => {
  destroyEditor()
  editorEnabled.value = false
}

const enableEditor = () => {
  editorEnabled.value = true
  const data = localStorage.getItem("editorContent")
  initEditor({
    ...editorConfig,
    data: data ? JSON.parse(data) : null,
  })
}

onMounted(enableEditor)

const clear = () => {
  localStorage.removeItem("editorContent")
  if (editor.value) {
    editor.value.blocks.clear()
  }
}

const save = async () => {
  if (!editor.value) return;
  const output = await editor.value.save()
  const outputString = JSON.stringify(output, null, 4)
  localStorage.setItem("editorContent", outputString)
}

</script>
