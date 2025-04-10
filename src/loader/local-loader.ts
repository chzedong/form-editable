import { Plugin, PluginDescriptor, PluginLoader } from "../widgets/type";

export class LocalLoader implements PluginLoader {
  async load(descriptor: PluginDescriptor): Promise<Plugin> {
    return import(`../widgets/components/${descriptor}-widget`)
      .then((module) => {
        const plugin = module.default;
        return plugin;
      })
      .catch((error) => {
        console.error("Error loading plugin:", error);
      });
  }
}

