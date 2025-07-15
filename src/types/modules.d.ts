declare module '*.js' {
  const content: any;
  export default content;
}

declare module './ExampleData/Simpledata' {
  export function getData(): any[];
}

declare module './ExampleData/Datanumber' {
  export function getData(): any[];
}

declare module 'path' {
  export function resolve(...paths: string[]): string;
  export function dirname(path: string): string;
  export default { resolve, dirname };
}

declare module 'url' {
  export function fileURLToPath(url: string): string;
}
