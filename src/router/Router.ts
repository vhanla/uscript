/*
Keep in mind that this implementation assumes all navigation is happening through the router's go method or browser back and forward buttons. If you plan on using <a> tags for navigation, you may want to add an event listener for intercepting clicks on such elements and navigating using the router's go method instead.
*/
import  Route,{RouteConfig} from "./Route";
import RouteGuard from "./RouteGuard";


interface ActiveRoute extends RouteConfig {
  domElement?: HTMLElement;
}

export class Router {
  private rootView: HTMLElement;
  private routes: Route[];
  private activeRoute: ActiveRoute | null;
  
  constructor(rootView: HTMLElement, routeConfigs: RouteConfig[]) {
    this.rootView = rootView;
    this.routes = routeConfigs.map(config => new Route(config));
    this.activeRoute = null;

    window.addEventListener('popstate', this.handlePopState.bind(this));
    this.navigate(window.location.pathname, false);
  }
  
  private handlePopState(): void {
    this.navigate(window.location.pathname, false);
  }
  
  private async navigate(path: string, addToHistory: boolean): Promise<void> {
    const targetRoute = this.routes.find(route => route.match(path));

    if (targetRoute) {
      if (targetRoute.isGuarded()) {
        const canActivate = await targetRoute.canActivate();
        if (!canActivate) return;
      }
      
      if (this.activeRoute) {
        this.activeRoute?.domElement?.remove();
        this.activeRoute = null;
      }
      
      const domElement = targetRoute.prepareDomElement();
      this.activeRoute = { ...targetRoute.getConfig(), domElement };
      this.rootView.appendChild(domElement);

      if (addToHistory) {
        window.history.pushState(null, '', path);
      }
    }
  }
  
  public go(path: string): void {
    this.navigate(path, true);
  }
}