import {EditorConfig} from "@editorjs/editorjs";
import {createVueComponentPlugin} from "./createVueComponentPlugin.ts";
import DummyPluginComponent from "./DummyPluginComponent.vue";

const youtubeIconString = "<svg height=\"800px\" width=\"800px\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
  "       xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
  "       viewBox=\"0 0 461.001 461.001\" xml:space=\"preserve\">\n" +
  "    <g>\n" +
  "      <path style=\"fill:#F61C0D;\" d=\"M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728\n" +
  "        c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137\n" +
  "        C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607\n" +
  "        c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z\"/>\n" +
  "    </g>\n" +
  "  </svg>"

const DummyPlugin = createVueComponentPlugin(DummyPluginComponent, youtubeIconString)

export const editorConfig: EditorConfig = {
  autofocus: true,
  tools: {
    dummyPlugin: DummyPlugin
  }
}