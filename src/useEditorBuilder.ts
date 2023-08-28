import EditorJS, {EditorConfig} from "@editorjs/editorjs";
import {ref} from "vue";

export const useEditorBuilder = () => {

  const holder = `vue-editor-js`

  const initEditor = (editorConfig: EditorConfig) => {
    destroyEditor()
    editor.value = new EditorJS({
      holder,
      ...editorConfig
    })
  }

  const destroyEditor = () => {
    if (editor.value) {
      try {
        editor.value.destroy()
      } catch (e) {
        console.log(e);
      }
      editor.value = null
    }
  }

  const editor = ref<EditorJS | null>(null);

  return {
    holder,
    editor,
    initEditor,
    destroyEditor
  }
}