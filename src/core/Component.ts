import { createSignal, connectSignal, DisconnectFn } from "./Signal";

type RenderFunction = () => void;

export abstract class Component {
  private renderSignal: [(v?: boolean) => boolean, (v: boolean) => void];
  private disconnectFn: DisconnectFn | null;

  constructor() {
    this.renderSignal = createSignal<boolean>(false);
    this.disconnectFn = null;
  }
  
  // Connects renderSignal to render() when component is connected to the DOM
  connectedCallback(): void {
    this.disconnectFn = connectSignal(() => this.renderSignal[0](), this.render.bind(this));
    this.onConnected();
  }

  // Disconnects renderSignal when component is removed from the DOM
  disconnectedCallback(): void {
    if (this.disconnectFn) {
      this.disconnectFn();
      this.disconnectFn = null;
    }
    this.onDisconnected();
  }
  
  // Method to be implemented by subclasses for rendering the component
  protected abstract render(): void;

  // Method to be implemented by subclasses for handling the DOM connection
  protected abstract onConnected(): void;

  // Method to be implemented by subclasses for handling the DOM disconnection
  protected abstract onDisconnected(): void;

  // Triggers an update to the component by updating renderSignal
  protected update(): void {
    this.renderSignal[1](true);
  }
}

