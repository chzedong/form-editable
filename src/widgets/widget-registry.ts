import { Plugin, PluginDescriptor, PluginLoader, PluginType } from "./type";

export class WidgetRegistry {
  private plugins = new Map<string, Plugin>();
  private loaders = new Map<PluginType, PluginLoader>();

  // 支持多种加载方式
  registerLoader(type: PluginType, loader: PluginLoader) {
    this.loaders.set(type, loader);
  }

  async register(type: PluginType, descriptor: PluginDescriptor) {
    const loader = this.loaders.get(type);

    if (!loader) {
      throw new Error(`No loader registered for type: ${type}`);
    }

    const plugin = await loader.load(descriptor);

    plugin.beforeRegister?.();
    await plugin.init();

    this.plugins.set(plugin.id, plugin);
  }

  getPlugin<T extends Plugin>(id: string): T {
    if (!this.plugins.has(id)) {
      throw new Error(`Plugin not found: ${id}`);
    }

    return this.plugins.get(id) as T;
  }
}
