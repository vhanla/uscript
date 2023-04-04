export function createSignal<T>(value: T): [(v?: T) => T, (v: T) => void] {
  let currentValue = value;
  return [
    (v?: T) => v === undefined ? currentValue : currentValue = v,
    (v: T) => currentValue = v
  ];
}

export function connectSignal(signal: () => any, callback: () => void): DisconnectFn {
  // Logic for subscribing to signal's updates and call the callback function
  
  return () => {
    // Logic to unsuscribe from signal's update
  }
}

export type DisconnectFn = () => void;