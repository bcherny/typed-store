declare module baobab {

  export interface Baobab {
    (obj: any, opts: any): Baobab;
    get(key?: string): any;
    set(key: string | Array<any> | Object, value?: any): any;
    select(key: string): any;
  }

  export interface Cursor {
    (tree: Baobab, path: [string], hash: string): Cursor;
    get(key?: string): any;
    set(key: string | Array<any> | Object, value?: any): any;
    select(key: string): any;
    on(event: string, fn: (any) => any): any;
  }

}