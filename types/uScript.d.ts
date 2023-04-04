// types/uScript.d.ts

declare module 'uScript' {
  export * from '../src/core/Component';
  export * from '../src/core/uScript';
  export * from '../src/router/Router';
  export * from '../src/router/Route';
  export * from '../src/store/Store';
  export * from '../src/directives';
}

// src/core/Component.ts
declare class Component {
  protected abstract render(): void;
  protected abstract onConnected(): void;
  protected abstract onDisconnected(): void;
  protected update(): void;
}

// src/core/uScript.ts
declare class uScript {
  static createApp(options: AppOptions): App;
}

interface AppOptions {
  rootElement: HTMLElement;
  routes: RouteConfig[];
}

declare class App {
  start(): void;
}

// src/router/Router.ts
declare class Router {
  constructor(routesConfig: RouteConfig[], root: HTMLElement);
}

// src/router/Route.ts
interface RouteConfig {
  path: string;
  component: typeof Component;
  guards?: RouteGuard[];
}

declare class Route {
  constructor(routeConfig: RouteConfig);
  match(path: string): boolean;
  canActivate(): Promise<boolean>;
}

interface RouteGuard {
  canActivate: () => Promise<boolean> | boolean;
}

// src/store/Store.ts
declare class Store<T> {
  constructor(initialState: T);
  getState(): T;
  dispatch(action: (state: T) => T | Promise<T>): Promise<void>;
}

// src/directives/index.ts
interface Directive {
  bind?: (context: DirectiveContext) => void;
  update?: (context: DirectiveContext) => void;
  unbind?: (context: DirectiveContext) => void;
}

interface DirectiveContext {
  el: Node;
  value: any;
  oldValue: any;
}

declare function directive(name: string, object: Directive): void;