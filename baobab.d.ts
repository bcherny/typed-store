declare module 'baobab' {

  export interface Baobab {
    (obj: any, opts: any): Baobab;
  }

  export interface Cursor {
    (tree: Baobab, path: [string], hash: string): Cursor;
    get(key?: string): any;
    set(key: string | Array<any> | Object, value?: any): any;
  }

}