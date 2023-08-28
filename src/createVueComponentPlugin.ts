import {createApp, Component} from 'vue';
import {BlockTool} from "@editorjs/editorjs";

export function createVueComponentPlugin(
  VueComponent: Component,
  iconComponent: string
) {
  return class VueComponentPlugin implements BlockTool {
    static toolbox = {
      icon: iconComponent
    };

    vueApp: ReturnType<typeof createApp> | null = null;

    render() {
      const wrapper = document.createElement('div');

      this.vueApp = createApp(VueComponent);
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