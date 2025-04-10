import { LocalLoader } from "../../loader/local-loader";
import { WidgetRegistry } from "../../widgets/widget-registry";

const registry = new WidgetRegistry();
registry.registerLoader("local", new LocalLoader());

export default registry;