import { Component } from './Component';

type ComponentConstructor<T extends Component> = new () => T;

interface ComponentRegistry {
  [tagName: string]: ComponentConstructor<Component>;
}

export class uScript {
  private componentRegistry: ComponentRegistry;

  constructor() {
    this.componentRegistry = {};
  }

  /**
   * Registers a custom element using provided component class.
   *
   * @param tagName - Name of the custom element (e.g., 'my-component').
   * @param componentClass - Subclass of Component to associate with the custom element.
   */
  registerComponent<T extends Component>(
    tagName: string,
    componentClass: ComponentConstructor<T>
  ): void {
    if (!(componentClass.prototype instanceof Component)) {
      throw new Error('Component class must be a subclass of the Component base class.');
    }

    if (this.componentRegistry[tagName]) {
      console.warn(`Component with tagName '${tagName}' is already registered.`);
      return;
    }

    this.componentRegistry[tagName] = componentClass;
    customElements.define(tagName, componentClass);
  }

  /**
   * Get registered component class by its tag name.
   *
   * @param tagName - Name of the custom element.
   * @return The registered component class or undefined.
   */
  getComponentByTagName<T extends Component>(
    tagName: string
  ): ComponentConstructor<T> | undefined {
    return this.componentRegistry[tagName] as ComponentConstructor<T>;
  }
}

// Export the default instance of uScript
const uscriptInstance = new uScript();
export default uscriptInstance;