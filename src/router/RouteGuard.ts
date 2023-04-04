export default abstract class RouteGuard {
  public abstract canActivate(): Promise<boolean> | boolean;
}