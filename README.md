# typed-store

> a strongly typed store for angular 1.x

**under active development**

## usage

```js
angular.service('myService', Store => {
  const myStore = new Store({ foo: 1 }, {
    onUpdate: changes => { ... }
  })
  myStore.foo = 2
})
```

## building

```sh
npm install
tsd install
gulp
```

## developing

`gulp watch`

## running the tests

`npm test`