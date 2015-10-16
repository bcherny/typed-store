# typed-store

> a strongly typed store for angular 1.x

**under active development**

## usage

```js
angular.controller('myController', ($scope, Store) => {

  const t = type.type
  $scope.myStore = new Store({
    foo: t.number,
    bar: t.or(t.string, t.number),
    baz: t.instanceOf(Date)
  })

  $scope.myStore.foo = 2   // 2
  $scope.myStore.foo       // 2
  $scope.myStore.foo = []  // TypeError!

  $scope.$watch('myStore.foo', _ => console.log('foo changed!', _))

})
```

## advantages over plain old objects for state

- centralized state store for your entire app
- immutable backing store for cheap state identity and equality checks, free snapshotting, and undo/redo
- mutable facade for easy integration with angular
- typed model for validation
- free model de/serialization for the full app state

## building

`npm start`

## developing

`gulp watch`

## running the tests

`npm test`