/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../baobab.d.ts" />
import angular from 'angular'
import Baobab from 'baobab'
import { isPlainObject, noop, uniqueId } from '_'

angular
.module('coatue/store', [])
.factory('Store', () => {

  const store:Baobab = new Baobab({}, {
    asynchronous: false,
    immutable: true,
    syncwrite: true
  })

  interface IStoreOptions {
    id?: string
    onUpdate?: (object) => any
  }

  class Store implements Baobab {

    cursor: baobab.Cursor

    constructor (schema = {}, options: IStoreOptions = {}) {

      const id = options.id ? options.id : uniqueId()
      const onUpdate = options.onUpdate || noop

      store.set(id, {})

      this.cursor = store.select(id)
      this.cursor.on('update', () => onUpdate(this.cursor.get()))

      // create getters & setters for each key in the schema
      this.assign(this.cursor, this, schema)

    }

    assign (cursor: baobab.Cursor, facade: Object, schema: Object): void {
      Object.keys(schema).forEach(key => {
        const value = schema[key]
        if (isPlainObject(value)) {
          cursor.set(key, {})
          facade[key] = {}
          this.assign(cursor.select(key), facade[key], value)
        } else {
          cursor.set(key, value)
          Object.defineProperty(facade, key, {
            get: () => cursor.get(key),
            set: _ => cursor.set(key, _)
          })
        }
      })
    }

    get (key) {
      return this.cursor.get(key)
    }

    set (key, value) {
      return this.cursor.set(key, value)
    }

    static getFor (id: string): Baobab {
      return store.select(id)
    }

  }

  return Store

})