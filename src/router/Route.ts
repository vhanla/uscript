
export interface RouteConfig {
  path: string;
  component: () => void;
  guards?: RouteGuard[];
}

export default class Route {
  private config: RouteConfig;

  constructor(config: RouteConfig) {
    this.config = config;
  }
  
  public match(targetPath: string): boolean {
    return this.config.path === targetPath;
  }
  
  public async canActivate(): Promise<boolean> {
    if (!this.config.guards) return true;

    for (const guard of this.config.guards) {
      const canActivate = await guard.canActivate();
      if (!canActivate) return false;
    }
    
    return true;
  }
  
  public isGuarded(): boolean {
    return !!(this.config.guards && this.config.guards.length > 0);    
  }

  public prepareDomElement(): HTMLElement {
    const rootElement = document.createElement('div');
    this.config.component.call(null, rootElement);
    return rootElement;
  }
  
  public getConfig(): RouteConfig {
    return this.config;
  }
}
