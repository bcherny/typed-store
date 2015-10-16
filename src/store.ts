/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../baobab.d.ts" />
import angular from 'angular'
import Baobab from 'baobab'
import { noop, uniqueId } from '_'

angular
.module('coatue/store', [])
.factory('Store', () => {

  const store = new Baobab({}, {
    asynchronous: false,
    immutable: true,
    syncwrite: true
  })

  interface StoreOptions {
    id?: string
    onUpdate?: (object) => any
  }

  class Store {

    cursor: Baobab

    constructor (data = {}, options: StoreOptions = {}) {

      const id = options.id ? options.id : uniqueId()
      const onUpdate = options.onUpdate || noop

      store.set(id, data)
      this.cursor = store.select(id)
      this.cursor.on('update', () => onUpdate(this.cursor.get()))

    }

    get (key?: string): any {
      return this.cursor.get(key)
    }

    set (key: string|Array<any>|Object, value?: any) {
      return this.cursor.set(key, value)
    }

    static getFor(id: string): Baobab {
      return store.select(id)
    }

  }

  return Store

})