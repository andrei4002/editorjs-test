<template>
  <div>
    <button @click="save">save</button>
    <button @click="clear">clear</button>
  </div>
  <div :id="holder"></div>
</template>

<script setup lang="ts">
import {useEditorBuilder} from "./useEditorBuilder.ts";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {editorConfig} from "./editorConfig.ts";

const {holder, editor, initEditor, destroyEditor} = useEditorBuilder()
const editorResult = ref<string | null>(null)

onBeforeUnmount(destroyEditor)

onMounted(() => {
  const data = loadStored()
  initEditor({
    ...editorConfig,
    data: data ? JSON.parse(data) : null,
  })
})

const clear = () => {
  localStorage.removeItem("editorContent")
  if (editor.value) {
    editor.value.blocks.clear()
  }
}

const save = async () => {
  if (!editor.value) return;

  console.log('saving');

  const output = await editor.value.save()
  const outputString = JSON.stringify(output, null, 4)
  localStorage.setItem("editorContent", outputString)
  editorResult.value = outputString
}

const loadStored = () => {
  const outputString = localStorage.getItem("editorContent")
  editorResult.value = outputString
  return outputString
}

</script>
