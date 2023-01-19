# favl

A purely functional AVL tree implementation in JavaScript. This library provides a suitable concrete data structure for implementing the Set abstract data type.


## API

```js
const favl = require('favl')


// Tree creation...

let tree = favl.AVLLeaf(5)


// Balanced insertion...

tree = favl.AVLInsert(favl.AVLLeaf(6), tree)
tree = favl.AVLInsert(favl.AVLLeaf(10), tree)
tree = favl.AVLInsert(favl.AVLLeaf(4), tree)


// Balanced removal... 

tree = favl.AVLRemove(favl.AVLLeaf(4), tree)
```

Note that every operation returns a *new* tree/node instance since state is immutable.
