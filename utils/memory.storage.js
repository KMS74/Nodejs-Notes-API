var MemoryStorage = require("memorystorage");
// creating new MemoryStorage Object
var store = new MemoryStorage("note-app");

// helper function
const getKeys = (store) => {
  var keys = [];
  for (var i = 0; i < store.length; i++) {
    var key = store.key(i);
    keys.push(key);
  }
  return keys;
};

const getValues = (store) => {
  var values = [];
  for (var i = 0; i < store.length; i++) {
    var key = store.key(i);
    var value = store.getItem(key);
    values.push(value);
  }
  return values;
};

// store.setItem("name", "Karem");
// store.setItem("age", 22);
// store.setItem("userData", {
//   username: "Ali",
//   age: 40,
// });
// store.length = 3
//const key = store.key(0) => name
// store.getItem(key) => Karem

// console.log(getKeys(store));
// console.log(getValues(store));

module.exports = { store, getKeys, getValues };
