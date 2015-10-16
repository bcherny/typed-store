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

  class Store {

    constructor (data = {}, options = {}) {

      const id = options.id ? options.id : uniqueId()
      const onUpdate = options.onUpdate || noop

      store.set(id, data)

      this.cursor = store.select(id)
      this.cursor.on('update', () => onUpdate(this.cursor.get()))

    }

    static getFor(id: string): Baobab {
      return store.select(id)
    }

  }

  return Store

})