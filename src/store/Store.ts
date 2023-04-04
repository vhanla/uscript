export type State = Record<string, any>;
export type Reducer<T extends State> = (state: T, action: Action) => T;
export type Subscriber<T extends State> = (state: T) => void;
export interface Action { type: string; payload?: any; }

export class Store<T extends State> {
  private state: T;
  private reducer: Reducer<T>;
  private subscribers: Subscriber<T>[];

  constructor(reducer: Reducer<T>, initialState: T) {
    this.state = initialState;
    this.reducer = reducer;
    this.subscribers = [];
  }
  
  // Dispatch a new action in the store
  dispatch(action: Action): void {
    this.state = this.reducer(this.state, action);
    this.notifySubscribers();
  }
  
  // Get the current value of state in the store
  getState(): Readonly<T> {
    return this.state;
  }
  
  // Subscribe to state changes in the store
  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    };
  }
  
  // Notify subscribers of state changes in the store
  private notifySubscribers(): void {
    this.subscribers.forEach((subscriber) => subscriber(this.state));
  }
}