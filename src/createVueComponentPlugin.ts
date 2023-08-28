import {createApp, Component, reactive} from 'vue';
import {BlockTool} from "@editorjs/editorjs";
import {BlockToolConstructorOptions} from "@editorjs/editorjs/types/tools/block-tool";

interface VueComponentPluginConfig<Data> extends BlockToolConstructorOptions {
  data: Data;
}

export function createVueComponentPlugin<Data extends Record<string, any>>(
  VueComponent: Component,
  iconComponent?: string
) {
  return class VueComponentPlugin implements BlockTool {
    static toolbox = {
      icon: iconComponent
    };

    data: Data;
    vueApp: ReturnType<typeof createApp> | null = null;

    constructor({data}: VueComponentPluginConfig<Data>) {
      this.data = reactive(data);
    }

    render() {
      const wrapper = document.createElement('div');

      const rootProps = {
        editorData: this.data
      }

      this.vueApp = createApp(VueComponent, rootProps);
      this.vueApp.mount(wrapper);

      return wrapper;
    }

    destroy() {
      if (this.vueApp) {
        console.log('unmounting vue app');
        this.vueApp.unmount();
        this.vueApp = null;
      }
    }

    save() {

    }
  };
}